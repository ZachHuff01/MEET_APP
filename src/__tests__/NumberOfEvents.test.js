import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';



describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />); //no setNumb ...?
    });

    test('renders number of events text input', () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
        expect(numberTextBox).toBeInTheDocument();
        expect(numberTextBox).toHaveClass('number-of-events-input');
    });

    test('default value of the input field is 32', () => {
        const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
        expect(numberTextBox).toHaveValue(32);
    });
    
    test('value changes accordingly when user types', async() => {
        const user = userEvent.setup();
        const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
        await user.type(numberInput, '{backspace}{backspace}10');
        expect(numberInput).toHaveValue(10);
    });

});

describe ('<NumberOfEvents /> integration', () => {

  test('selected number of events by the user are rendered', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');

    await user.click(NumberOfEventsInput,'{backspace}{backspace}10');

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
    expect(allRenderedEventItems.length).toEqual(32);
  });

});

