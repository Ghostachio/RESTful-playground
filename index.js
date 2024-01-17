const express = require('express');
const app = express();
const path = require('path');
const {v4 : uuidv4} = require('uuid');
const methodOverride = require('method-override');
uuidv4();


app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set('views',path.join(__dirname, 'views'));

const comments = [
  {
    id: uuidv4(),
    username : 'Todd',
    comment : 'Hahah thats soo funny'
  },
  {
    id: uuidv4(),
    username : 'said',
    comment : 'what the hell is that'
  },
  {
    id: uuidv4(),
    username : 'william',
    comment : 'whoooo ?'
  }
]

app.get('/comments', (req, res) => {
  res.render('./comments/index.ejs', {comments})
})

app.get('/comments/new', (req,res)=> {
  res.render('comments/new');
})

app.post('/comments', (req, res)=> {
  const {username , comment} = req.body
  comments.push({username, comment, id:uuidv4()})
  res.redirect('/comments')
})

app.get('/comments/:id', (req, res)=> {
  const {id} = req.params
  const comment = comments.find(c => c.id === id)
  res.render('comments/show', {comment})
})

app.patch('/comments/:id', (req, res)=> {
  const {id} = req.params;
  const newCommentText = req.body.comment ;
  const commentFound = comments.find(c => c.id === id);
  commentFound.comment = newCommentText;
  res.redirect("/comments")
})

app.get('/comments/:id/edit', (req, res)=> {
  const {id} = req.params
  const comment = comments.find(c => c.id === id)
  res.render('comments/edit', { comment })
})

app.get('/tacos', (req, res) => {
  res.send('Get /tacos response')
})

app.post('/tacos', (req, res) => {
  const {meat, qty} = req.body
  res.send(`you have chosen ${qty} x ${meat}`)
})

app.listen('3000', () => {
  console.log('listening to port 3000')
})