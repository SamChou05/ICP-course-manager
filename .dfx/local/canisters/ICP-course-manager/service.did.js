export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createCourse' : IDL.Func(
        [IDL.Record({ 'title' : IDL.Text, 'description' : IDL.Text })],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'updated_at' : IDL.Nat64,
              'description' : IDL.Text,
              'created_date' : IDL.Nat64,
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'CourseDoesNotExist' : IDL.Text,
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
              'CourseDoesNotExist' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'enrollCourse' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Text,
              'title' : IDL.Text,
              'updated_at' : IDL.Nat64,
              'description' : IDL.Text,
              'created_date' : IDL.Nat64,
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'CourseDoesNotExist' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'readUsers' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
