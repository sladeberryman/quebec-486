$(document).ready(function() {
  
    // Function to convert a name to Pig Latin
    function convertToPigLatin(name) {
      var vowels = ["a", "e", "i", "o", "u"];
      var pigLatinName = "";
      var words = name.split(" ");
  
      // does stuff for each name the user enters
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var firstLetter = word[0];
        var restOfWord = word.slice(1);
  
        // Check if the first letter is a vowel
        if (vowels.includes(firstLetter.toLowerCase())) {
          pigLatinName += word + "hay";
        } else {
          pigLatinName += restOfWord + firstLetter.toLowerCase() + "ay";
        }
  
        if (i !== words.length - 1) {
          pigLatinName += " ";
        }
      }
  
      return pigLatinName;
    }

    // function to determine spirit animal
    function getSpiritAnimal(name) {
      const stringLength = name.length;
    
      if (stringLength <= 5) {
        return "Lion";
      } else if (stringLength <= 10) {
        return "Eagle";
      } else if (stringLength <= 15) {
        return "Ox";
      } else if (stringLength <= 20) {
        return "Dove";
      } else {
        return "Lamb";
      }
    }

  
    // Function to convert the names to Pig Latin and display the greeting
    function configName() {
      var name = $("#nameInput").val();
      var pigLatinGreeting = convertToPigLatin(name); // Calls pig latin function
      var spiritAnimal = getSpiritAnimal(name); // calls spirit animal function
  
      // display greeting
      $("#pig-latin").text("Your name in Pig Latin:  " + pigLatinGreeting);
      $("#spirit-animal").text("Your spirit animal: " + spiritAnimal);
    }


  


    // when they click submit
    $("#submit-btn").click(function(e) {
      e.preventDefault();
      configName(); // Calls functions
    });
  });