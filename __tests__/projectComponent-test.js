import React from 'react';
import renderer from 'react-test-renderer';
import Project from '../components/Project/Project';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from '../redux/store/configureStore';
const store = configureStore({});
import 'react-redux';


test('рендеринг карточки сотрудника', () => {

    const info =  {
        "id": "Time в ТРЦ Галерея",
        "projectName": "Time в ТРЦ Галерея",
        "pCompleted": false,
        "projectTasks": [
            {
                "id": "Time_0",
                "taskName": "монтаж воздуховодов",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "10.03.2019",
                "factDate": "08.03.2019",
                "respPerson": "Гриневский А.С."
            },
            {
                "id": "Time_1",
                "taskName": "утепление ветки притока",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "10.03.2019",
                "factDate": "",
                "respPerson": "Гриневский А.С."
            },
            {
                "id": "Time_3",
                "taskName": "установка фанкойлов",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "13.03.2019",
                "factDate": "07.03.2019",
                "respPerson": "Мороз В.А."
            },
            {
                "id": "Time_4",
                "taskName": "обвязка фанкойлов",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "13.03.2019",
                "factDate": "08.03.2019",
                "respPerson": "Мороз В.А."
            },
            {
                "id": "Time_5",
                "taskName": "прокладка воздуховодов от фанкойлов",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "11.03.2019",
                "factDate": "",
                "respPerson": "Шишков Р.В."
            },
            {
                "id": "Time_6",
                "taskName": "установка адаптеров и вентрешеток",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "11.03.2019",
                "factDate": "08.03.2019",
                "respPerson": "Гриневский А.С."
            },
            {
                "id": "Time_7",
                "taskName": "установка и подключение пультов ДУ",
                "tCompleted": true,
                "createDate": "01.03.2019",
                "completeDate": "15.03.2019",
                "factDate": "08.03.2019",
                "respPerson": "Шишков Р.В."
            },
            {
                "id": "Time_8",
                "taskName": "запуск системы чиллер-фанкойла",
                "tCompleted": true,
                "createDate": "01.03.2019",
                "completeDate": "15.03.2019",
                "factDate": "09.03.2019",
                "respPerson": "Шавлюга А.В."
            },
            {
                "id": "Time_9",
                "taskName": "монтаж воздуховодов",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "10.03.2019",
                "factDate": "08.03.2019",
                "respPerson": "Гриневский А.С."
            },
            {
                "id": "Time_10",
                "taskName": "утепление ветки притока",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "10.03.2019",
                "factDate": "",
                "respPerson": "Гриневский А.С."
            },
            {
                "id": "Time_11",
                "taskName": "установка фанкойлов",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "13.03.2019",
                "factDate": "07.03.2019",
                "respPerson": "Мороз В.А."
            },
            {
                "id": "Time_12",
                "taskName": "обвязка фанкойлов",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "13.03.2019",
                "factDate": "08.03.2019",
                "respPerson": "Мороз В.А."
            },
            {
                "id": "Time_13",
                "taskName": "прокладка воздуховодов от фанкойлов",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "11.03.2019",
                "factDate": "",
                "respPerson": "Шишков Р.В."
            },
            {
                "id": "Time_14",
                "taskName": "установка адаптеров и вентрешеток",
                "tCompleted": false,
                "createDate": "01.03.2019",
                "completeDate": "11.03.2019",
                "factDate": "08.03.2019",
                "respPerson": "Гриневский А.С."
            },
            {
                "id": "Time_15",
                "taskName": "установка и подключение пультов ДУ",
                "tCompleted": true,
                "createDate": "01.03.2019",
                "completeDate": "15.03.2019",
                "factDate": "08.03.2019",
                "respPerson": "Шишков Р.В."
            },
            {
                "id": "Time_16",
                "taskName": "запуск системы чиллер-фанкойла",
                "tCompleted": true,
                "createDate": "01.03.2019",
                "completeDate": "15.03.2019",
                "factDate": "09.03.2019",
                "respPerson": "Шавлюга А.В."
            }
        ]
    };

    const currTeam =['Шпинева Е.Л.','Шпинев Д.А.','Петлицкий М.В.','Савенкова Е.В.','Савенкова Н.В.','Гриневский' +
    ' А.С.','Мороз В.А.','Шавлюга А.В.','Шишков Р.В.'];

    const component = renderer.create(
        <Provider store={store}>
            < BrowserRouter >
                <Project
                    code={info.id}
                    name={info.projectName}
                    tasks={info.projectTasks}
                    team={currTeam}
                />
            </BrowserRouter>
        </Provider>

    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});