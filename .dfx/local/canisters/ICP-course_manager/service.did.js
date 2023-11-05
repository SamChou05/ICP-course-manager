export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createUser' : IDL.Func(
        [IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Principal,
            'username' : IDL.Text,
            'createdAt' : IDL.Nat64,
            'courseIds' : IDL.Vec(IDL.Text),
          }),
        ],
        [],
      ),
    'deleteCourse' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'updated_at' : IDL.Nat64,
              'creator' : IDL.Principal,
              'description' : IDL.Text,
              'created_date' : IDL.Nat64,
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'CourseDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        [],
      ),
    'deleteUser' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'username' : IDL.Text,
              'createdAt' : IDL.Nat64,
              'courseIds' : IDL.Vec(IDL.Text),
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'CourseDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        [],
      ),
    'enrollCourse' : IDL.Func(
        [
          IDL.Principal,
          IDL.Record({
            'title' : IDL.Text,
            'description' : IDL.Text,
            'assigned_to' : IDL.Text,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'updated_at' : IDL.Nat64,
              'creator' : IDL.Principal,
              'description' : IDL.Text,
              'created_date' : IDL.Nat64,
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'CourseDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        [],
      ),
    'readCourseById' : IDL.Func(
        [IDL.Text],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'updated_at' : IDL.Nat64,
              'creator' : IDL.Principal,
              'description' : IDL.Text,
              'created_date' : IDL.Nat64,
            })
          ),
        ],
        ['query'],
      ),
    'readCourses' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'updated_at' : IDL.Nat64,
              'creator' : IDL.Principal,
              'description' : IDL.Text,
              'created_date' : IDL.Nat64,
            })
          ),
        ],
        ['query'],
      ),
    'readUserById' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Principal,
              'username' : IDL.Text,
              'createdAt' : IDL.Nat64,
              'courseIds' : IDL.Vec(IDL.Text),
            })
          ),
        ],
        ['query'],
      ),
    'readUserIdByUsername' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Principal)],
        ['query'],
      ),
    'readUsers' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
