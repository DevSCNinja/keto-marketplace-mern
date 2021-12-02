const express = require('express')
const router = express.Router()

// MODEL
const Course = require('../../models/Course')

router.post('/addNewCourse', async (req, res) => {
  const newCourse = new Course({
    ...req.body
  })

  await newCourse.save()

  res.json({
    success: true
  })
})

router.get('/getCourses', async (req, res) => {
  const courses = await Course.find()

  res.json({
    success: true,
    courses
  })
})

router.get('/getCourse/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)

  res.json({
    success: true,
    course
  })
})

router.post('/updateCourse/:id', async (req, res) => {
  const update = { ...req.body }
  await Course.findByIdAndUpdate(req.params.id, update)

  res.json({
    success: true
  })
})

router.delete('/deleteCourse/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id)

  res.json({
    success: true
  })
})

module.exports = router