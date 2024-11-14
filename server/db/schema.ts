import { type InferInsertModel,relations,sql } from "drizzle-orm"
import { primaryKey } from "drizzle-orm/mysql-core"

import { sqliteTable,integer,text } from "drizzle-orm/sqlite-core"
export const user = sqliteTable('user',{
    id:integer('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    address : text('address').notNull()

})
export type User = InferInsertModel<typeof user>

export const post = sqliteTable('post',{
    id:integer('id').primaryKey(),
    content:text('content'),
    authorId:text('author_id')
})
export type Post = InferInsertModel<typeof post>
export const userRelations = relations(user, ({ many }) => ({
	post: many(post),
}))

export const postRelations = relations(post,({one})=>({
    author:one(user,{
        fields:[post.authorId],
        references:[user.id]

    })
}))

export const student = sqliteTable('student',{
    id: integer('id').primaryKey(),
    stdName : text('std_name'),
    grade: text('grade')
})

export type Student = InferInsertModel<typeof student>

export const course = sqliteTable('course',{
    id:integer('id').primaryKey(),
    courseName : text('course_name')
})
export type Course = InferInsertModel<typeof course>

export const studentToCourse = sqliteTable('student_to_course', {
    stdId: integer('std_id').notNull().references(() => student.id),
    courseId: integer('course_id').notNull().references(() => course.id)
},
// (t) => ({
//     pk: primaryKey({ columns: [t.stdId, t.courseId] }),
// })
)

export type StudentToCourse = InferInsertModel<typeof studentToCourse>

export const studentRelation = relations(student,({many})=>({
    studentToCourse : many(studentToCourse)
})) 

export const courseRelation = relations(course,({many})=>({
    studentToCourse: many(studentToCourse)
}))

export const studentTocourseRelation = relations(studentToCourse,({one})=>({
    student: one(student,{
        fields:[studentToCourse.stdId],
        references:[student.id]
    }), 
    course: one(course,{
        fields:[studentToCourse.courseId],
        references:[course.id]
    })
}))