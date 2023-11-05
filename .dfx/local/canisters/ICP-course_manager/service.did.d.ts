import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createUser' : ActorMethod<
    [string],
    {
      'id' : Principal,
      'username' : string,
      'createdAt' : bigint,
      'courseIds' : Array<string>,
    }
  >,
  'deleteCourse' : ActorMethod<
    [Principal],
    {
        'Ok' : {
          'id' : string,
          'title' : string,
          'updated_at' : bigint,
          'creator' : Principal,
          'description' : string,
          'created_date' : bigint,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'CourseDoesNotExist' : Principal }
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
          { 'CourseDoesNotExist' : Principal }
      }
  >,
  'enrollCourse' : ActorMethod<
    [
      Principal,
      { 'title' : string, 'description' : string, 'assigned_to' : string },
    ],
    {
        'Ok' : {
          'id' : string,
          'title' : string,
          'updated_at' : bigint,
          'creator' : Principal,
          'description' : string,
          'created_date' : bigint,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'CourseDoesNotExist' : Principal }
      }
  >,
  'readCourseById' : ActorMethod<
    [string],
    [] | [
      {
        'id' : string,
        'title' : string,
        'updated_at' : bigint,
        'creator' : Principal,
        'description' : string,
        'created_date' : bigint,
      }
    ]
  >,
  'readCourses' : ActorMethod<
    [],
    Array<
      {
        'id' : string,
        'title' : string,
        'updated_at' : bigint,
        'creator' : Principal,
        'description' : string,
        'created_date' : bigint,
      }
    >
  >,
  'readUserById' : ActorMethod<
    [Principal],
    [] | [
      {
        'id' : Principal,
        'username' : string,
        'createdAt' : bigint,
        'courseIds' : Array<string>,
      }
    ]
  >,
  'readUserIdByUsername' : ActorMethod<[string], [] | [Principal]>,
  'readUsers' : ActorMethod<[], Array<string>>,
}
