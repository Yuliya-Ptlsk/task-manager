import {filterByPersonFunc} from '../modules/modules-test';

test('проверка фильтрации списка задач по признаку "исполнитель" ', () => {
    let info = [
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
            "tCompleted": false,
            "createDate": "01.03.2019",
            "completeDate": "15.03.2019",
            "factDate": "09.03.2019",
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
    ];

    let value_1='Шишков Р.В.';
    let value_2='Мороз В.А.';

    expect(filterByPersonFunc(info,value_1)).not.toBe(info); // проверка равны ли ссылки после изменений
    expect(filterByPersonFunc(info,value_2)).not.toBe(info);

    expect(filterByPersonFunc(info,value_1)).toEqual(info); // проверка на глубокое сравнение
    expect(filterByPersonFunc(info,value_2)).toEqual(info);
});