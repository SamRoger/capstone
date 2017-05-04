$(document).ready(function() {

	$("#myModal").modal("show").show(500);
	$("#myModal").on("click", function(){
		$("#myModal").modal("hide");
	})

	$(document).on("keydown", function(event) {
		if (event.key === "Enter") {
			setTimeout(function(){
				$('#pickLetter').modal('hide');
			}, 1000);
			
		}
	})

	triesRemaining = 6
	var guessInput = $("#guessInput");
	guessInput.focus();
	var phrases = ["i love brittanee", "try to guess this phrase", "javascript", "coding can be challenging"];
	var phrase = phrases[Math.floor(Math.random()*phrases.length)];
	var splitPhrase = phrase.split(" ");

	var allLetters = splitPhrase.join('').split('');

	guessInput.on("keydown", function(event) {
		if (event.key === "Enter") {
			guessLetter(guessInput.val());
		}


	})



	populatePhrase(splitPhrase);

	$('#guessBtn').on('click', function() {
		var guessedLetter = $('#guessInput').val();
		guessLetter(guessedLetter)
	});

	function guessLetter(letter) {
		if ($("#guessInput").val() == "") {
			$("#pickLetter").modal("show")	

		return
		}


		if (allLetters.indexOf(letter) > -1) {
			var letterDivs = $(".unguessed");
			var letterIndex = allLetters.indexOf(letter);
			$(letterDivs[letterIndex]).append(letter.toUpperCase());
			$(letterDivs[letterIndex]).removeClass("unguessed");
			allLetters.splice(letterIndex, 1);

			if(allLetters.indexOf(letter) !== -1) {
				guessLetter(letter);

			}

		} else {
			triesRemaining = triesRemaining - 1

			if(triesRemaining == 1) {

				$(".lastChance").modal("show");

				setTimeout(function(){
				$(".lastChance").modal("hide");
			}, 1500);

			} else {

				$(".tryModal").modal("show");

				setTimeout(function(){
					$(".tryModal").modal("hide");
				}, 2000);

				$(".wrongLetter").text(letter.toUpperCase());
				$(".numberTries").html(triesRemaining);
			}

			if(triesRemaining == 0) {
				
				var g = $("#game");
				$("body").html(g);
				$("#game").modal("show");

			}
		}

		$("#guessInput").val("");
		$("#guessInput").focus();

	}

})

function populatePhrase(phrase) {
	for (var i = 0; i < phrase.length; i++) {

		var word = $("<div class='word'></div>");
		$("#board").append(word);
		populateLetters(word, phrase[i]);

	}
}


function populateLetters(word, phrase) {

	for (var i = 0; i < phrase.length; i++) {
		var letter;
		if (phrase[i] === "'") {
			letter = $("<div class='letter'>'</div>");
		} else {
			letter = $("<div class='letter unguessed'></div>");
		}
		word.append(letter);
	}


}

	

