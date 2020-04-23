const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb+srv://dexter:test@cluster0-e8drk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// Create a schema
const todoSchema = new mongoose.Schema({
    item: String
});

// Create model
const Todo = mongoose.model('Todo', todoSchema);

// let item1 = Todo({item: 'learn nodejs and mongoDB'}).save(err => {
//     if (err) throw err;
//     console.log('item saved');
// });

// список тудушек
// let data = [{item: 'learn js'}, {item: 'learn nodejs'}, {item: 'find job'}];


module.exports = app => {

    app.get('/todo', (req, res) => {
        // отрендерим todo.ejs и передадим в нее список тудушек
        // res.render('todo', {todos: data});

        // Get data from mondoDB and pass it to view
        Todo.find({}, (err, data) => {
            if (err) throw err;
            console.log('loaded data from mongoDB ', data);
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', (req, res) => {
        // data.push(req.body);
        // res.render('todo', {todos: data});

        // get data from the view and add it to mongoDB
        Todo(req.body).save((err, data) => {
            if (err) throw err;
            console.log('pushed data from mongoDB ', data);
            res.json(data);
        });
    });

    // можно сделать как минимум двумя способами
    // первый способ
    // app.delete('/todo/:item', (req, res) => {
    //     data = data.filter(todo => {
    //         return todo.item.replace(/ /g, '-') !== req.params.item;
    //     });
    //     // res.render('todo', {todos: data});
    //     res.json(data);
    // });

    // второй способ
    app.delete('/todo', (req, res) => {
        // data = data.filter(todo => todo.item.replace(/ /g, '--') !== req.body.item);
        // res.json(data);

        // delete the requested item from mongoDB
        Todo.find({item: req.body.item.replace(/\--/g, ' ')}).remove((err, data) => {
            if (err) throw err;
            console.log('deleted data from mongoDB ', data);
            res.json(data);
        });
    });

};