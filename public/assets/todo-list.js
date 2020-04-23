document.addEventListener('DOMContentLoaded', () => {
    // Выберем форму добавления тудушки
    const addTodoForm = document.forms['add-todo'];
    // Обработаем отправку данных тудушки
    addTodoForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // выберем инпут с новой тудушкой и получим его содержимое
        const item = document.querySelector('#new-item');
        // создадим объект для отправки серверу
        const todo = { item: item.value };

        // отправим POST запрос на сервер
        fetch('/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // отправляемые данные в формате JSON
            },
            body: JSON.stringify(todo)
        }).then(res => {
            // после получения успешного ответа перезагрузим страницу
            location.reload()
        }).catch(err => console.error(err));
    });

    // удалим тудушки из списка
    const todos = document.querySelectorAll('li');
    todos.forEach(todo => {
        todo.addEventListener('click', e => {
            const item = e.target.textContent.replace(/ /g, '--');

            // можно сделать как минимум двумя способами
            // первый способ
            // fetch(`/todo/${item}`, {
            //     method: 'DELETE'
            // }).then(res => {
            //     location.reload();
            // });

            // второй способ
            fetch('/todo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json' // отправляемые данные в формате JSON
                },
                body: JSON.stringify({item})
            }).then(res => {
                location.reload();
            });
        });
    });
});