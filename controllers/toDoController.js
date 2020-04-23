// список тудушек
let data = [{item: 'learn js'}, {item: 'learn nodejs'}, {item: 'find job'}];


module.exports = app => {

    app.get('/todo', (req, res) => {
        // отрендерим todo.ejs и передадим в нее список тудушек
        res.render('todo', {todos: data});
    });

    app.post('/todo', (req, res) => {
        data.push(req.body);
        res.render('todo', {todos: data});
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
        data = data.filter(todo => todo.item.replace(/ /g, '-') !== req.body.item);
        res.json(data);
    });

};