@foo
Feature: Login

  Background: Navigation
    Given Navigate to the visn website

  Scenario Outline: Validate login with valid credentials
    When Enter user credentials "<username>" and "<password>"
    When Click on submit button
    Then App should land on HomePage

    Examples: 
      | username             | password |
      | newlease@fleet.co.uk | 12345678 |

  Scenario Outline: Validate login with invalid credentials
    When Enter user credentials "<username>" and "<password>"
    When Click on submit button
    Then App should throw inline message for invalid username and password

    Examples: 
      | username             | password |
      | newlease@fleet.co.uk | 12345679 |

  Scenario Outline: Validate email and password field inline validation
    When Click on submit button
    Then App should throw inline message for username and password required field
