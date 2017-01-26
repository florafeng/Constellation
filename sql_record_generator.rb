# a quick and dirty script to generate some records for the test db - FOR DEVELOPMENT PURPOSES ONLY
# ... also an example of what not to do. DON'T DO THIS, FLORA - very irresponsible. Use Faker or something.

first_names = ['Flora', 'Michael', 'Shaun', 'Ginger', 'Chris', 'Thomas', 'Nick', 'Fionna', 'Shehad', 'Sandra']
last_names = ['Smith', 'Johnson', 'Wu', 'Frankford', 'Simpson', 'Patel', 'Ross', 'Roth', 'McDonald', 'Harvey', 'Wilson']
streets = ['Fake', 'Dundas', 'King', 'Queen', 'Oak', '1st', 'Main', 'Bloor']
COURSES = 14

sql_file = File.open("./record_set.sql", 'w');

# people - 100 records
1.upto(100) do |n|
  phone = "(#{100 + rand(900)}) #{100 + rand(900)}-#{1000 + rand(9000)}"
  address = "#{1 + rand(999)} #{streets.sample} St."
  sql_file << "INSERT INTO people VALUES (default, '#{first_names.sample}', '#{last_names.sample}', '#{phone}', '#{address}');\n"
end

# teachers - 20 records
1.upto(20) do |n|
  sql_file << "INSERT INTO faculty VALUES (default, #{n}, 2, 1, #{2 + rand(7)});\n"
end

# principal
sql_file << "INSERT INTO faculty VALUES (default, 21, 1, 1, 1);\n"

# janitors
sql_file << "INSERT INTO faculty VALUES (default, 22, 3, 1, 1);\n"
sql_file << "INSERT INTO faculty VALUES (default, 23, 3, 1, 1);\n"
sql_file << "INSERT INTO faculty VALUES (default, 24, 3, 1, 1);\n"

# students - 76 records
25.upto(100) do |n|
  sql_file << "INSERT INTO students VALUES (default, #{n}, 1);\n"
end

# course sections - 2 per course
14.upto(41) do |n|
  course_id = n % 14 + 1
  sql_file << "INSERT INTO course_sections VALUES (default, #{course_id}, #{1 + rand(20)});\n"
end

# course rosters - enroll each student in 4 COURSES
1.upto(76) do |n|
  course_section = 1 + rand(28)
  sql_file << "INSERT INTO course_rosters VALUES (default, #{n}, #{course_section}, #{1 + rand(100)});\n"
  course_section = (course_section + 6) % 28 + 1
  sql_file << "INSERT INTO course_rosters VALUES (default, #{n}, #{course_section}, #{1 + rand(100)});\n"
  course_section = (course_section + 6) % 28 + 1
  sql_file << "INSERT INTO course_rosters VALUES (default, #{n}, #{course_section}, #{1 + rand(100)});\n"
  course_section = (course_section + 6) % 28 + 1
  sql_file << "INSERT INTO course_rosters VALUES (default, #{n}, #{course_section}, #{1 + rand(100)});\n"
end
