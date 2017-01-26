DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS faculty CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS course_sections CASCADE;
DROP TABLE IF EXISTS course_rosters CASCADE;

CREATE TABLE people (
  id SERIAL PRIMARY KEY NOT NULL,
  fname VARCHAR(20) NOT NULL,
  lname VARCHAR(20) NOT NULL,
  phone VARCHAR(14) NOT NULL,
  address VARCHAR(50) NOT NULL
);

CREATE TABLE schools (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);
INSERT INTO schools VALUES (default, 'Lighthouse Labs');

CREATE TABLE roles (
  id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR(30) NOT NULL,
  salary INTEGER NOT NULL
);
INSERT INTO roles VALUES (default, 'principal', 70000);
INSERT INTO roles VALUES (default, 'teacher', 50000);
INSERT INTO roles VALUES (default, 'janitor', 35000);

CREATE TABLE departments (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(20) NOT NULL,
  school_id INTEGER NOT NULL REFERENCES schools(id)
);
INSERT INTO departments VALUES (default, 'administration', 1);
INSERT INTO departments VALUES (default, 'math', 1);
INSERT INTO departments VALUES (default, 'art', 1);
INSERT INTO departments VALUES (default, 'science', 1);
INSERT INTO departments VALUES (default, 'physical education', 1);
INSERT INTO departments VALUES (default, 'language', 1);
INSERT INTO departments VALUES (default, 'technology', 1);
INSERT INTO departments VALUES (default, 'religion', 1);

CREATE TABLE faculty (
  id SERIAL PRIMARY KEY NOT NULL,
  person_id INTEGER NOT NULL REFERENCES people(id),
  role_id INTEGER NOT NULL REFERENCES roles(id),
  school_id INTEGER NOT NULL REFERENCES schools(id),
  department_id INTEGER NOT NULL REFERENCES departments(id)
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY NOT NULL,
  person_id INTEGER NOT NULL REFERENCES people(id),
  school_id INTEGER NOT NULL REFERENCES schools(id)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY NOT NULL,
  code VARCHAR(6) NOT NULL,
  description VARCHAR(20) NOT NULL,
  department_id INTEGER NOT NULL REFERENCES departments(id)
);
INSERT INTO courses VALUES (default, 'MTH202', 'Calculus', 2);
INSERT INTO courses VALUES (default, 'MTH302', 'Adv. Calculus', 2);
INSERT INTO courses VALUES (default, 'ART100', 'Music Theory', 3);
INSERT INTO courses VALUES (default, 'ART500', 'Visual Arts', 3);
INSERT INTO courses VALUES (default, 'SCI499', 'Economics', 4);
INSERT INTO courses VALUES (default, 'SCI189', 'Psychology', 4);
INSERT INTO courses VALUES (default, 'PHY111', 'Gym', 5);
INSERT INTO courses VALUES (default, 'PHY234', 'Health', 5);
INSERT INTO courses VALUES (default, 'LNG255', 'Mandarin', 6);
INSERT INTO courses VALUES (default, 'LNG455', 'English', 6);
INSERT INTO courses VALUES (default, 'TEC900', 'Intro. to Coding', 7);
INSERT INTO courses VALUES (default, 'TEC011', 'Woodworking', 7);
INSERT INTO courses VALUES (default, 'REL230', 'World Religions', 8);
INSERT INTO courses VALUES (default, 'REL444', 'History of Theology', 8);

CREATE TABLE course_sections (
  id SERIAL PRIMARY KEY NOT NULL,
  course_id INTEGER NOT NULL REFERENCES courses(id),
  faculty_id INTEGER NOT NULL REFERENCES faculty(id)
);

CREATE TABLE course_rosters (
  id SERIAL PRIMARY KEY NOT NULL,
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_section_id INTEGER NOT NULL REFERENCES course_sections(id),
  grade INTEGER
);