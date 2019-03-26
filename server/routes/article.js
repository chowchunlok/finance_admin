var express = require('express')
var router = express.Router()
var model = require('../db/db')

router.get('/list', function(req, res) {
  model.Article.find({}, (err, doc) => {
    // console.log(doc) //DEBUG:
    if (err) {
      console.log('list_err 8040:', err) //DEBUG:list_err 8040
      res.json({
        code: 8040,
        message: 'Database Error'
      })
    } else if (!doc) {
      res.json({
        code: 8041,
        message: 'Not Found Data'
      })
    } else {
      res.json({
        code: 2000,
        data: {
          total: doc.length,
          items: doc
        },
        message: 'Fetch Article List Success'
      })
    }
  })
})

// id获取文章详细
router.get('/details', function(req, res) {
  let id = req.query.id
  console.log(id) //CHECK:
  model.Article.findOne({ id }, (err, doc) => {
    if (err) {
      console.log('8042 err:', err) //DEBUG: 8042 err
      res.json({
        code: 8042,
        message: 'Database Error'
      })
    } else if (!doc) {
      res.json({
        code: 8043,
        message: 'Not Found Data'
      })
    } else {
      res.json({
        code: 2000,
        data: {
          message: 'Fetch Success',
          items: doc
        }
      })
    }
  })
})

//增加文章
router.post('/create', function(req, res) {
  let createData = req.body.data
  let title = createData.title
  let status = createData.status
  //set id
  createData.id = null //NOTE: id
  model.Article.findOne({ title }, (err, doc) => {
    if (err) {
      console.log('err 8044:', err) //DEBUG: 8040 err
      res.json({
        code: 8044,
        message: 'Database Error'
      })
    }
    if (doc) {
      res.json({
        code: 8045,
        message: 'The article already exists'
      })
    } else {
      new model.Article(createData).save((err, pro) => {
        if (err) {
          console.log('create article err', err) //DEBUG: 8048 err
          res.json({
            code: 8048,
            message: 'Database Error'
          })
        }
        // create success --> insert id
        model.Article.find({}, (err, doc))
          .then(doc => {
            doc.forEach((item, index) => {
              if (!item.id) {
                model.Article.update({ id: null }, { id: index + 1 })
                  .then(raw => {})
                  .catch(err => {
                    console.log('insert id err', err) //DEBUG: 8051 err
                    res.json({
                      code: 8051,
                      message: 'Server Error'
                    })
                    return
                  })
                res.json({
                  code: 2000,
                  message: `${status} article success`
                })
              }
            })
          })
          .catch(err => {
            console.log('update failed', err) //DEBUG: 8050 err
            res.json({
              code: 8050,
              message: 'update failed'
            })
          })
      })
    }
  })
})

//更新文章
router.post('/update', function(req, res) {
  let updateData = req.body.data
  let id = updateData.id
  let status = updateData.status
  model.Article.findOne({ id }, (err, doc) => {
    if (err) {
      console.log('8042 err:', err) //DEBUG:8042 err
      res.json({
        code: 8042,
        message: 'Database Error'
      })
    }
    if (!doc) {
      res.json({
        code: 8043,
        message: 'Not Found Data'
      })
    } else {
      model.Article.update({ id }, updateData)
        .then(raw => {
          res.json({
            code: 2000,
            message: `${status} article success`
          })
        })
        .catch(err => {
          console.log('update article', err) //DEBUG: update article
          res.json({
            code: 8049,
            message: 'Database Error'
          })
        })
    }
  })
})

// 从数据库删除文章
router.get('/delete', function(req, res) {
  let deleteId = req.query.id

  model.Article.deleteOne({ id: deleteId })
    .then(data => {
      console.log('2000', data) //CHECK:
      if (data.ok === 1) {
        res.json({
          code: 2000,
          message: 'Delete Success'
        })
      } else {
        console.log('8054 err', err) //DEBUG: 8054 err
        res.json({
          code: 8054,
          message: 'Delete Failed'
        })
      }
    })
    .catch(err => {
      console.log('8053 err', err) //DEBUG: 8053 err
      res.json({
        code: 8053,
        message: 'Delete Failed'
      })
    })
})

//获取作者列表
router.get('/author/list', function(req, res) {
  model.Author.find({}, (err, doc) => {
    if (err) {
      console.log('author_err 8046:', err) //DEBUG:update_err 8046
      res.json({
        code: 8046,
        message: 'Database Error'
      })
    }
    if (!doc) {
      res.json({
        code: 8046,
        message: 'Not Found Data'
      })
    } else {
      let key = req.query.key
      let authorList = doc[0].authorList
      let resList = []
      if (key === '') {
        resList = authorList
        res.json({
          code: 2000,
          message: 'Search Author List Success',
          data: resList
        })
        return
      }
      authorList.forEach(item => {
        if (item.name.includes(key)) {
          console.log('item', item)
          resList.push(item)
        }
      })
      res.json({
        code: 2000,
        message: 'Search Author List Success',
        data: {
          authorList: resList
        }
      })
    }
  })
})

module.exports = router
