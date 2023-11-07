import { Canister, query, text, update, Void, nat, nat64 , Vec,Record, Principal, StableBTreeMap, Variant, Opt,ic, Result} from 'azle';

// This is a global variable that is stored on the heap
// We're using a Map to associate an ID with each message
//let courses: Map<text, text> = new Map();
const User = Record({
    id: Principal,
    createdAt: nat64,
    courseIds: Vec(text), // Changed from Vec(Principal) to Vec(text)
    username: text
});

const course = Record({
    id: text,
    title: text,
    description: text,
    created_date: nat64,
    updated_at: nat64,

})

const coursePayload = Record({
    title: text,
    description: text,
})

const CourseError = Variant({
    CourseDoesNotExist: text, // Changed from Principal to text
    UserDoesNotExist: Principal
});


let users = StableBTreeMap(Principal, User, 0);
let courses = StableBTreeMap(text, course, 1);

export default Canister({

    //User Functions
    createUser: update([text], User, (username) => {
        const id = generateId();
        const user: typeof User = {
            id,
            createdAt: ic.time(),
            courseIds: [],
            username
        };

        users.insert(user.id, user);

        return user;
    }),
    readUsers: query([], Vec(text), () => {
        // Explicitly declare the type of the user parameter as User
        return users.values().map((user: typeof User) => user.username);
    }),
    deleteUser: update([Principal], Result(User, CourseError), (id) => {
        const userOpt = users.get(id);
    
        if ('None' in userOpt) {
            return Err({
                UserDoesNotExist: id
            });
        }
    
        const user = userOpt.Some;
    
        user.courseIds.forEach((courseId: text) => {
            courses.remove(courseId);
        });
    
        users.remove(user.id);
    
        return Ok(user);
    }),

    //Course Functions
    createCourse: update([coursePayload], Result(course, CourseError), (courseData) => {
        // Generate a new course ID
        const courseId = generateTextId();
    
        // Construct the new course object
        const newCourse: typeof course = {
            id: courseId,
            title: courseData.title,
            description: courseData.description,
            created_date: ic.time(),
            updated_at: ic.time(),
        };
    
        // Insert the new course into the courses data store
        courses.insert(courseId, newCourse);
    
        // Return the newly created course
        return Ok(newCourse);
    }),
    
    
    enrollCourse: update(
        [Principal, text], // The second parameter is now the course ID as text
        Result(course, CourseError),
        (userId, courseId) => {
            // Check if the user exists
            const userOpt = users.get(userId);
            if ('None' in userOpt) {
                return Err({
                    UserDoesNotExist: userId
                });
            }
    
            // Check if the course exists
            const courseOpt = courses.get(courseId);
            if ('None' in courseOpt) {
                return Err({
                    CourseDoesNotExist: courseId
                });
            }
    
            // Get the user and course from the Option type
            const user = userOpt.Some;
            const enrolledCourse = courseOpt.Some;
    
            // Update the user's list of course IDs
            const updatedUser: typeof User = {
                ...user,
                courseIds: [...user.courseIds, courseId]
            };
    
            // Update the user record in the users data store
            users.insert(updatedUser.id, updatedUser);
    
            // Return the enrolled course
            return Ok(enrolledCourse);
        }
    ),
    
    

    /*
    readUserIdByUsername: query([text], Opt(Principal), (username) => {
        // Iterate over all users and return the ID of the user with the matching username
        for (const [userId, user] of users.entries()) {
            if (user.username === username) {
                return { Some: userId }; // Return the ID wrapped in a Some variant
            }
        }
        
        // If no user is found with the given username, return None
        return { None: null };
    }),

    readUserById: query([Principal], Opt(User), (id) => {
        return users.get(id);
    }),
    readCourseById: query([text], Opt(course), (id) => {
        return courses.get(id);
    }),
    */
    
});

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
function Ok<T>(value: T): Result<T, never> {
    return { Ok: value };
  }
  
  // Helper function to create an Err result
  function Err<E>(error: E): Result<never, E> {
    return { Err: error };
  }

  function generateTextId(): text {
    const timestamp = Date.now().toString();
    const randomPortion = Math.random().toString(36).substring(2, 10);
    return `course-${timestamp}-${randomPortion}`;
}
