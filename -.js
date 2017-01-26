var data = {
      "tables" : [
        {
          "name" : "students",
          "columns" : ["id", "person_id", "school_id"],
          "relationships" : {
            "people" : {
              "from" : "person_id",
              "to" : "id"
            },
            "schools" : {
              "from" : "school_id",
              "to" : "id"
            }
          }
        },
        {
          "name" : "people",
          "columns" : ["id", "fname", "lname", "phone", "address"],
          "relationships" : {}
        },
        {
          "name" : "schools"
          "columns" : ["id", "name"],
          "relationships" : {}
        },
        {
          "name" : "roles",
          "columns" : ["id", "description", "salary"],
          "relationships" : {}
        },
        {
          "name" : "faculty",
          "columns" : ["id", "person_id", "role_id", "school_id"],
          "relationships" : {
            "people" : {
              "from" : "person_id",
              "to" : "id"
            },
            "roles" : {
              "from" : "role_id",
              "to" : "id"
            },
            "schools" : {
              "from" : "school_id",
              "to" : "id"
            }
          }
        },
        {
          "name" : "departments",
          "columns" : ["id", "name", "school_id"],
          "relationships" : {
            "schools" : {
              "from" : "school_id",
              "to" : "id"
            }
          }
        },
        {
          "name" : "courses",
          "columns" : ["id", "code", "description", "department_id"],
          "relationships" : {
            "departments" : {
              "from" : "department_id",
              "to" : "id"
            }
          }
        },
        {
          "name" : "course_sections",
          "columns" : ["id", "course_id", "faculty_id"],
          "relationships" : {
            "faculty" : {
              "from" : "faculty_id",
              "to" : "id"
            }
          }
        },
        {
          "name" : "course_sections",
          "columns" : ["id", "student_id", "course_section_id", "grade"],
          "relationships" : {
            "students" : {
              "from" : "student_id",
              "to" : "id"
            },
            "course_sections" : {
              "from" : "course_section_id",
              "to" : "id"
            }
          }
        }
      ]
    }