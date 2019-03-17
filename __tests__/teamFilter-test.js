import {teamFilterFunc} from '../modules/modules-test';

test('проверка фильтрации списка сотрудников по фамилии', () => {
    let info = [
        {
            "id": "Ш.Е.Л.15.12.1986",
            "fam": "Шпинева",
            "name": "Евгения",
            "otch": "Леонидовна",
            "position": "Директор",
            "tel": "+375296654556",
            "email": "evgeniya_sobal@gmail.com",
            "dateOfBirth": "15.12.1986",
            "address": "г.Минск, ул.Мястровская, 5, кв.56",
            "photoURL": "img/ceo3.jpg"
        },
        {
            "id": "Ш.Д.А.04.02.1992",
            "fam": "Шпинев",
            "name": "Дмитрий",
            "otch": "Алексеевич",
            "position": "Зам. директора по коммерческим вопросам",
            "tel": "+375296941821",
            "email": "dmitryshpinev@mail.ru",
            "dateOfBirth": "04.02.1992",
            "address": "г.Минск, ул.Мястровская, 5, кв.56",
            "photoURL": "img/fd.jpg"
        },
        {
            "id": "П.М.В.13.03.1990",
            "fam": "Петлицкий",
            "name": "Максим",
            "otch": "Владимирович",
            "position": "Главный инженер",
            "tel": "+375447409315",
            "email": "petlitskiy1990@gmail.com",
            "dateOfBirth": "13.03.1990",
            "address": "г.Минск, ул.Жиновича, 11, кв.29",
            "photoURL": "img/ce3.jpg"
        },
        {
            "id": "С.Е.В.11.01.1971",
            "fam": "Савенкова",
            "name": "Елена",
            "otch": "Викторовна",
            "position": "Главный бухгалтер",
            "tel": "+375296594202",
            "email": "elenasavenkova@gmail.com",
            "dateOfBirth": "11.01.1971",
            "address": "Минская обл., пос.Ратомка, пер.Подгорный, 7",
            "photoURL": "img/ca.jpg"
        },
        {
            "id": "С.Н.В.18.06.1997",
            "fam": "Савенкова",
            "name": "Надежда",
            "otch": "Владимировна",
            "position": "Бухгалтер",
            "tel": "+37529359402",
            "email": "nadyasavenkova@gmail.com",
            "dateOfBirth": "18.06.1997",
            "address": "Минская обл., пос.Ратомка, ер.Подгорный, 7",
            "photoURL": "img/accountant.jpg"
        },
        {
            "id": "Г.А.С.17.07.1995",
            "fam": "Гриневский",
            "name": "Артем",
            "otch": "Сергеевич",
            "position": "Инженер-механик",
            "tel": "+375335629085",
            "email": "agrinevsky@mail.ru",
            "dateOfBirth": "17.07.1995",
            "address": "г.Минск, ул.Бакинская, 6, кв.74",
            "photoURL": "img/im.jpg"
        },
        {
            "id": "М.В.А.30.05.1984",
            "fam": "Мороз",
            "name": "Вячеслав",
            "otch": "Александрович",
            "position": "Монтажник СВиК ",
            "tel": "+375337605511",
            "email": "morozva@tut.by",
            "dateOfBirth": "30.05.1984",
            "address": "г.Минск, ул.Гвардейская, 1А, кв.36",
            "photoURL": "img/mounter_2.jpg"
        },
        {
            "id": "Ш.А.В.16.05.1993",
            "fam": "Шавлюга",
            "name": "Александр",
            "otch": "Викторович",
            "position": "Монтажник СВиК ",
            "tel": "+375298906190",
            "email": "a_shavluga@gmail.com",
            "dateOfBirth": "16.05.1993",
            "address": "г.Минск, ул.Горецкого, 15, кв.71",
            "photoURL": "img/mounter_3.jpg"
        },
        {
            "id": "Ш.Р.В.20.10.1997",
            "fam": "Шишков",
            "name": "Руслан",
            "otch": "Вячеславович",
            "position": "Монтажник СВиК ",
            "tel": "+375295068580",
            "email": "shiskovruslan@tut.by",
            "dateOfBirth": "20.10.1997",
            "address": "Минская обл., г.п.Руденск, ул.Советская, 34, кв.10",
            "photoURL": "img/mounter_1.jpg"
        }
    ];

    let value_1 = 'Петлицкий';
    let value_2 = 'Шпинева';

    expect(teamFilterFunc(info, value_1)).not.toBe(info); // проверка равны ли ссылки после изменений
    expect(teamFilterFunc(info, value_2)).not.toBe(info);

    expect(teamFilterFunc(info, value_1)).toEqual(info); // проверка на глубокое сравнение
    expect(teamFilterFunc(info, value_2)).toEqual(info);
});