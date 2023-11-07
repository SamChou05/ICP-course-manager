import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'createCourse' : ActorMethod<
    [{ 'title' : string, 'description' : string }, Principal],
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
    [Principal, { 'title' : string, 'description' : string }],
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
  'readUsers' : ActorMethod<[], Array<string>>,
}
