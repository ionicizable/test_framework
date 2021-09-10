Feature: EPAM Career tests

  # Scenario: As a user, I can click Learn more

  #   Given I open 'https://www.epam.com/careers'
  #   When I accept cookies
  #   And I click "Learn more"
  #   Then url should be "https://www.epam.com/careers/epam-without-borders"

  Scenario Outline: As a user, I can use all filters

    Given I open 'https://www.epam.com/careers'
    When I accept cookies
    And I check "<checkbox>" box
    And I type "<keyword>" in "Keyword field"
    And I choose "<city>" city in "<country>" country
    And I submit filters
    Then locations should contain "<city>" city or "<country>" country
    And applications should have "<checkbox>" icon
    And job names should contain "<keyword>"
    
    Examples:
      | city    | country | checkbox        | keyword |
      | Minsk   | Belarus | Remote checkbox | Java    |
      # | Yerevan | Armenia | Office checkbox | RPA     |

