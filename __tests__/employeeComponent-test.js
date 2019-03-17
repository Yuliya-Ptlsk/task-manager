import React from 'react';
import renderer from 'react-test-renderer';
import Employee from '../components/Employee/Employee';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from '../redux/store/configureStore';
const store = configureStore({});
import 'react-redux';


test('рендеринг карточки сотрудника', () => {

    const info =  {
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
    };

    const component = renderer.create(
        <Provider store={store}>
            < BrowserRouter >
                <Employee
                          code={info.id}
                          fam={info.fam}
                          name={info.name}
                          otch={info.otch}
                          position={info.position}
                          tel={info.tel}
                          email={info.email}
                          date={info.dateOfBirth}
                          address={info.address}
                          url={info.photoURL}
                />
            </BrowserRouter>
        </Provider>

    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

});