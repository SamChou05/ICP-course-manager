import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createCourse' : ActorMethod<
    [{ 'title' : string, 'description' : string }],
    {
        'Ok' : {
          'id' : string,
          'title' : string,
          'updated_at' : bigint,
          'description' : string,
          'created_date' : bigint,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'CourseDoesNotExist' : string }
      }
  >,
  'createUser' : ActorMethod<
    [string],
    {
      'id' : Principal,
      'username' : string,
      'createdAt' : bigint,
      'courseIds' : Array<string>,
    }
  >,
  'deleteUser' : ActorMethod<
    [Principal],
    {
        'Ok' : {
          'id' : Principal,
          'username' : string,
          'createdAt' : bigint,
          'courseIds' : Array<string>,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'CourseDoesNotExist' : string }
      }
  >,
  'enrollCourse' : ActorMethod<
    [Principal, string],
    {
        'Ok' : {
          'id' : string,
          'title' : string,
          'updated_at' : bigint,
          'description' : string,
          'created_date' : bigint,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'CourseDoesNotExist' : string }
      }
  >,
  'readCourses' : ActorMethod<
    [],
    Array<{ 'id' : string, 'title' : string, 'description' : string }>
  >,
  'readUsers' : ActorMethod<[], Array<string>>,
  'readUsersByUsername' : ActorMethod<[string], Array<Principal>>,
}
