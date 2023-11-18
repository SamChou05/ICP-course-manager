import { Canister, query, text, update, Void, nat, nat64 , Vec,Record, Principal, StableBTreeMap, Variant, Opt,ic, Result} from 'azle';

const User = Record({
    id: Principal,
    createdAt: nat64,
    courseIds: Vec(text), 
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
    CourseDoesNotExist: text, 
    UserDoesNotExist: Principal
});

//Map of users
let users = StableBTreeMap(Principal, User, 0);

//Map of courses 
let courses = StableBTreeMap(text, course, 1);

export default Canister({

    //User Functions

    //Creates a User
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
    
    //Returns the map of all active users
    readUsers: query([], Vec(text), () => {
        return users.values().map((user: typeof User) => user.username);
    }),

    //Deletes a user given the UserID
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

    //Gives a users UserID based on their Username, in case they forgot their ID
    readUsersByUsername: query([text], Vec(Principal), (searchUsername) => {
        // Filter the users to only include those with the same username
        const filteredUsers = users.values().filter((user: typeof User) => user.username === searchUsername);
    
        // Map the filtered users to their IDs
        const userIds = filteredUsers.map((user: typeof User) => user.id);
    
        return userIds;
    }),

    //Course Functions

    //Creates a new course with course title and description. Also generates a unique courseID
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
    
    //Given a userID and a courseID enroll the user in the course
    enrollCourse: update(
        [Principal, text], 
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

    unenrollUserFromCourse: update(
        [text, Principal], 
        Result(Void, CourseError),
        (courseId, userId) => {
            // Check if the course exists
            const courseOpt = courses.get(courseId);
            if (!courseOpt || 'None' in courseOpt) {
                return Err({
                    CourseDoesNotExist: courseId
                });
            }
    
            // Check if the user exists
            const userOpt = users.get(userId);
            if (!userOpt || 'None' in userOpt) {
                return Err({
                    UserDoesNotExist: userId
                });
            }
    
            // Get the user from the Option type
            const user = userOpt.Some;
    
            // Remove the course ID from the user's list of courses
            const updatedCourseIds = user.courseIds.filter((id:any) => id !== courseId);
    
            // Update the user's list of course IDs
            const updatedUser: typeof User = {
                ...user,
                courseIds: updatedCourseIds
            };
    
            // Update the user record in the users data store
            users.insert(updatedUser.id, updatedUser);
    
            // Return success
            return Ok(user);
        }
    ),
        
        //Returns the courseID, title, and description of all created courses (courses that users can enroll in)
        readCourses: query([], Vec(Record({
            id: text,
            title: text,
            description: text
        })), () => {
            return courses.values().map((Course: typeof course) => {
                return {
                    id: Course.id,
                    title: Course.title,
                    description: Course.description
                };
            });
        }),

    //Returns all the courses that a user is enrolled in 
    readUserCourseTitles: query([Principal], Result(Vec(text), CourseError), (userId) => {
        // Check if the user exists
        const userOpt = users.get(userId);
        if ('None' in userOpt) {
            return Err({
                UserDoesNotExist: userId
            });
        }

        // Get the user from the Option type
        const user = userOpt.Some;

        // Initialize an array to hold course titles
        let courseTitles: text[] = [];

        // Loop through the user's enrolled course IDs
        user.courseIds.forEach((courseId:any) => {
            // Retrieve the course using the courseId
            const courseOpt = courses.get(courseId);
            if ('None' in courseOpt) {
                // This shouldn't happen normally, but handle it just in case
                return Err({
                    CourseDoesNotExist: courseId
                });
            }

            // Get the course and add its title to the list
            const course = courseOpt.Some;
            courseTitles.push(course.title);
        });

        // Return the list of course titles
        return Ok(courseTitles);
    }),
});

//creates unique ID's for users
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

  //creates unique ID's for courses
  function generateTextId(): text {
    const timestamp = Date.now().toString();
    const randomPortion = Math.random().toString(36).substring(2, 10);
    return `course-${timestamp}-${randomPortion}`;
}
