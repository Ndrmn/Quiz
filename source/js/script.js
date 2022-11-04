// Global variables

let nameValue = 0;
let currentNameValue;
let quizArr = [];

// Radiobutton function-generator

function nextName () {

	nameValue = nameValue + 1;
	return nameValue;
}

// Create quiz card function

function createQuizFunc () {

	let quiz = document.createElement('div');
	quiz.classList.add('card');
	quiz.classList.add('container');
	quiz.classList.add('draggableQuiz');	

	let closeButton = document.createElement('button');
	closeButton.classList.add('btn-close');
	closeButton.type = 'button';
	closeButton.ariaLabel = 'Close';

	let quizBody = document.createElement('div');
	quizBody.classList.add('card-body');
	quizBody.classList.add('qstn');	

	let h3Title = document.createElement('h3');
	h3Title.classList.add('title');
	h3Title.classList.add('h3');
	h3Title.classList.add('noselect');
	h3Title.innerText = 'Enter name of quiz:';

	let inputQuizName = document.createElement('input');
	inputQuizName.classList.add('form-control');
	inputQuizName.type = 'text';
	inputQuizName.placeholder = 'Quiz name';
	inputQuizName.ariaLabel="default input example";

	let questionContainer = document.createElement('div');
	questionContainer.classList.add('questionsContainer');

	let newQuestion = document.createElement('button');
	newQuestion.type = 'button';
	newQuestion.classList.add('btn-outline-primary');
	newQuestion.classList.add('btn');
	newQuestion.classList.add('addQuestion');
	newQuestion.innerText = '+ question';

	// let sendButtonDiv = document.createElement('div');
	// sendButtonDiv.classList.add('d-flex');
	// sendButtonDiv.classList.add('justify-content-center');

	// let sendButton = document.createElement('button');
	// sendButton.classList.add('btn');
	// sendButton.classList.add('btn-primary');
	// sendButton.classList.add('send');
	// sendButton.type = 'button';
	// sendButton.innerText = 'Send';



	let quizContainer = document.querySelector('.quizContainer');

	quiz.append(closeButton);
//	sendButtonDiv.append(sendButton);
	quizBody.append(h3Title);
	quizBody.append(inputQuizName);
	quizBody.append(questionContainer);
	quizBody.append(newQuestion);
	quiz.append(quizBody);

	quizContainer.append(quiz);

	let showButton = document.querySelector('.send');

	if (showButton.classList.contains('hide')) {
		showButton.classList.remove('hide');
	};

	dragNDrop();

}

// Create question card function

function addQuestionFunc () {

	let question = document.createElement('div');
	question.classList.add('card');


	let closeButton = document.createElement('button');
	closeButton.classList.add('btn-close');
	closeButton.type = 'button';
	closeButton.ariaLabel = 'Close';

	let questionBody = document.createElement('div');
	questionBody.classList.add('card-body');
	questionBody.classList.add('question');
	questionBody.classList.add('draggableQuestion');


	let questionTitle = document.createElement('h4');
	questionTitle.classList.add('title');
	questionTitle.classList.add('h4');
	questionTitle.classList.add('noselect');
	questionTitle.innerText = 'Enter name of question:';

	let questionName = document.createElement('input');
	questionName.classList.add('form-control');
	questionName.type = 'text';
	questionName.placeholder = 'Question name';
	questionName.ariaLabel = 'default input example';

	let addAnswer = document.createElement('button');
	addAnswer.type = 'button';
	addAnswer.classList.add('btn');
	addAnswer.classList.add('btn-outline-primary');
	addAnswer.classList.add('addAnswer');
	addAnswer.innerText = '+ answer';

	questionBody.append(questionTitle);
	questionBody.append(questionName);
	questionBody.append(addAnswer);

	question.append(closeButton);
	question.append(questionBody);

	dragNDrop();

	return question;
}

// Create answer function

function addAnswerFunc () {

	let answer = document.createElement('div');
	answer.classList.add('answer');
	answer.name = `${currentNameValue}`;

	let textArea = document.createElement('input');
	textArea.classList.add('form-control');
	textArea.type = 'text';
	textArea.placeholder = 'Answer';
	textArea.ariaLabel = 'default input example';

	let radioBtn = document.createElement('input');
	radioBtn.classList.add('form-check-input');
	radioBtn.type = 'radio';
	radioBtn.checked = true;
	radioBtn.name = `${currentNameValue}`;

	let btnLabel = document.createElement('label');
	btnLabel.classList.add('form-check-label');
	btnLabel.classList.add('noselect');
	btnLabel.innerText = 'True';

	let closeButton = document.createElement('button');
	closeButton.classList.add('btn-close');
	closeButton.classList.add('static');
	closeButton.type = 'button';
	closeButton.ariaLabel = 'Close';

	answer.append(textArea);
	answer.append(radioBtn);
	answer.append(btnLabel);
	answer.append(closeButton);

	dragNDrop();

	return answer;
}

// Add quiz button

let addQuizBtn = document.querySelector('.createQuiz');

addQuizBtn.addEventListener('click', function() {
	createQuizFunc();
});


// Remove element button

document.addEventListener('click', function (e) {

	let closeBtns = document.querySelectorAll('.btn-close');

		for (let elem of closeBtns) {
		if (elem == e.target) {
			elem.parentNode.remove();
		}

		let quizFalse = document.querySelector('.card-body');
		let buttonToHide = document.querySelector('.send');

		if (!quizFalse) {
			buttonToHide.classList.add('hide');
		}
	}
	dragNDrop();
});

// Add question button

document.addEventListener('click', function (e) {

	let addQuestionBtn = document.querySelectorAll('.addQuestion');

		for (let elem of addQuestionBtn) {
		if(elem == e.target) {
			let prev = elem.previousSibling;
			let newElem = addQuestionFunc();
			prev.append(newElem);
		}
	}
});

// Add answer button

document.addEventListener('click', function (e) {

	let addAnswerBtn = document.querySelectorAll('.addAnswer');

		for (let elem of addAnswerBtn) {
		if (elem == e.target) {

			if (elem.previousSibling.name > 0) {
				currentNameValue = elem.previousSibling.name; 
			} else {
				currentNameValue = nextName();
			}

			let parent = elem.parentNode;
			let newElem = addAnswerFunc();
			parent.insertBefore(newElem, elem);
		}
	}
});

// Export quiz-object to console

let sendBtn = document.querySelector('.send');

sendBtn.addEventListener('click', function () {


	let quizContainer = document.querySelector('.quizContainer');

	let quizList = quizContainer.childNodes;

	for (i=3; i<quizList.length; i++) {

		let quiz = quizList[i];

		let quizStructure = quiz.childNodes;

		let quizElems = quizStructure[1].childNodes;

		quizArr[i-3] = {};

		quizArr[i-3].quizName = quizElems[1].value;

		quizArr[i-3].questions = [];

		let questions = quizElems[2].childNodes;


		for (n=0; n<(questions.length); n++) {

			let questionElems = questions[n].childNodes[1].childNodes;

			quizArr[i-3].questions[n] = {};

			quizArr[i-3].questions[n].questionName = questionElems[1].value;

			quizArr[i-3].questions[n].answers = [];

			for (a = 2; a<(questionElems.length-1); a++) {
				let answers = questionElems[a].childNodes;

				quizArr[i-3].questions[n].answers[a-2] = {};
				quizArr[i-3].questions[n].answers[a-2].answerName = answers[0].value;
				quizArr[i-3].questions[n].answers[a-2].answerIsTrue = answers[1].checked;
			};
		};
	};

	console.log(quizArr);

});

let toggleTrue = true;
let toggleFalse = false;

function inner() {
	toggleTrue = true;
	toggleFalse = false;
}

function outer() {
	toggleTrue = false;
	toggleFalse = true;
}


function dragNDrop() {

	const elems = document.querySelectorAll('.questionsContainer');
	let arr = [];
	for (elem of elems) {
		arr.push(elem);
	}

	dragula(arr
	,{
		moves: function (el, source, handle, sibling) {

			if (true) {
				return toggleTrue;
			}
		}
	}
	);

	dragula([

		document.querySelector('.quizContainer')
	]
		,{
			moves: function (el, source, handle, sibling) {
				if(true) {
					return toggleFalse;
				}
			}
		}
	);
};

document.addEventListener('mouseover', function(e){

	const target = e.target;
//	const paarent = target.parentNode;

//	e.stopPropagation;

	if (target.classList.contains('draggableQuestion')) {
		inner();
		dragNDrop();
		console.log('inner');
	} else if (target.classList.contains('qstn')) {
		outer();
		dragNDrop();
		console.log('outer');	
	};

});