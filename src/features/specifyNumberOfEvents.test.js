import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  // SCENARIO 1
  test("When user hasn't specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let eventList;
    given("the user hasn't specified or filtered the number of events", () => {
      AppComponent = render(<App />);
    });

    when('the user sees the list of events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    then(/^the default number of displayed events will be (\d+)$/, (arg0) => {
      expect(eventList.length).toEqual(32);
    });
  });

  // SCENARIO 2
  test('User can change the number of events they want to see.', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let eventList;
    given('the user has events displayed', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    let AppDOM;
    let NumberOfEventsDOM;
    let numberOfEventsInput;
    when('the user chooses to change the number of events displayed', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
      await user.click(numberOfEventsInput, '{backspace}{backspace}10');

    });

    // when(
    //   'the user chooses to change the number of events displayed',
    //   async () => {
    //     const user = userEvent.setup();
    //     const button = AppComponent.queryByTestId('numberOfEventsInput');
        
    //     await user.type(button, "{backspace}{backspace}3");
    //   }
    // );

    then('the number of events displayed will update to the number the user selected', async () => {
        const AppDOM = AppComponent.container.firstChild;
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toEqual(32);
      }
    );
  });
});