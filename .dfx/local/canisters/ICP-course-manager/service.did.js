export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createCourse' : IDL.Func(
        [
          IDL.Record({ 'title' : IDL.Text, 'description' : IDL.Text }),
          IDL.Principal,
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
          IDL.Record({ 'title' : IDL.Text, 'description' : IDL.Text }),
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
    'readUsers' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
