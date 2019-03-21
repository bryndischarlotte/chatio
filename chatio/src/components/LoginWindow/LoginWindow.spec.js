import React from 'react';
import { shallow } from 'enzyme';
import LoginWindow from './LoginWindow';

// jest.mock('../..services/socketService');

describe('LoginWindow compenent tests', () => {
    let compenent;
    beforeEach(() => {
        compenent = shallow(<LoginWindow />);
        // socketService
    });

    it('should contain a button with class of .btn-primary', () => {
        expect(compenent.find('button').first().hasClass('btn-primary')).toBe(true);
    });

    // it('should test the generic input handler', () => {
    //     const loginInput = 'IceHot1';
    //     component.find('input[name="login-input"]').first().simulate('change', { target: { value: nickname } });
    // });

    // it('should contain an error if the form is invalid', () => {

    // });

    // it('should successfully submit the form if the data is valid', () => {

    // });
});