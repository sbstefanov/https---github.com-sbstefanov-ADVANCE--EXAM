window.addEventListener('load', solution);

function solution() {
  const employeeEl = document.getElementById('employee');
  const categoryEl = document.getElementById('category');
  const urgencyEl = document.getElementById('urgency');
  const teamEl = document.getElementById('team');
  const descriptionEl = document.getElementById('description');

  const btnAdd = document.getElementById('add-btn');

  const ulPreview = document.getElementsByClassName('preview-list')[0];
  const liPending = document.getElementsByClassName('pending-list')[0];
  const liRes = document.getElementsByClassName('resolved-list')[0];

  btnAdd.addEventListener('click', clickHandle)

  function clickHandle(e) {
    e.preventDefault();
    if (employeeEl.value.length <= 0 ||
      categoryEl.value.length <= 0 || urgencyEl.value.length <= 0 ||
      teamEl.value.length <= 0 || descriptionEl.value.length <= 0) {
      return;
    }
    
    const li = document.createElement('li');
    li.setAttribute('class', 'problem-content');

    btnAdd.disabled = true;

    const article = document.createElement('article');
    const paragraphOne = document.createElement('p');
    const paragraphTwo = document.createElement('p');
    const paragraphThree = document.createElement('p');
    const paragraphFour = document.createElement('p');
    const paragraphFive = document.createElement('p');

    const btnEdit = document.createElement('button');
    const btnContinue = document.createElement('button');

    btnEdit.setAttribute('class', 'edit-btn');
    btnContinue.setAttribute('class', 'continue-btn');

    btnEdit.textContent = `Edit`;
    btnContinue.textContent = 'Continue'


    paragraphOne.textContent = `From: ${employeeEl.value}`;
    paragraphTwo.textContent = `Category: ${categoryEl.value}`;
    paragraphThree.textContent = `Urgency: ${urgencyEl.value}`;
    paragraphFour.textContent = `Assigned to: ${teamEl.value}`;
    paragraphFive.textContent = `Description : ${descriptionEl.value}`;

    article.appendChild(paragraphOne);
    article.appendChild(paragraphTwo);
    article.appendChild(paragraphThree);
    article.appendChild(paragraphFour);
    article.appendChild(paragraphFive);

    li.appendChild(article);
    li.appendChild(btnEdit);
    li.appendChild(btnContinue);

    ulPreview.appendChild(li);
    clearInput();

    function clearInput() {
      employeeEl.value = '';
      categoryEl.value = '';
      urgencyEl.value = '';
      teamEl.value = '';
      descriptionEl.value = '';
    }

    btnEdit.addEventListener('click', editFun);

    function editFun(e) {
      e.preventDefault();
      const liItem = e.target.parentNode;
      let employeeText = paragraphOne.textContent.replace("From: ", "");
      employeeEl.value = employeeText;

      let [buffAge, categoryText] = paragraphTwo.textContent.split(' ');
      categoryEl.value = categoryText;

      let [buffTitle, urgencyText] = paragraphThree.textContent.split(' ');
      urgencyEl.value = urgencyText;

      let teamText = paragraphFour.textContent.replace("Assigned to: ", "");
      teamEl.value = teamText;

      let descriptionText = paragraphFive.textContent.replace("Description : ", "");
      descriptionEl.value = descriptionText;

      btnAdd.disabled = false;
      liItem.remove();
    }

    btnContinue.addEventListener('click', conFun);

    function conFun(e) {
      e.preventDefault();
      btnAdd.disabled = false;
      const liItem = e.target.parentNode;
      const article = e.target.parentNode.children[0];
      const liCre = document.createElement('li');
      liCre.setAttribute('class', 'problem-content');

      const btnRes = document.createElement('button');
      btnRes.setAttribute('class', 'resolve-btn');
      btnRes.textContent = `Resolve`;

      liCre.appendChild(article);
      liCre.appendChild(btnRes);
      liPending.appendChild(liCre);
      liItem.remove();
      debugger

      btnRes.addEventListener('click', resFun)

      function resFun(e) {
        e.preventDefault();
        const liItem = e.target.parentNode;
        const article = e.target.parentNode.children[0];

        const liCre = document.createElement('li');
        liCre.setAttribute('class', 'problem-content');

        const btnClear = document.createElement('button');
        btnClear.setAttribute('class', 'clear-btn');
        btnClear.textContent = `Clear`;

        liCre.appendChild(article);
        liCre.appendChild(btnClear);
        liRes.appendChild(liCre);
        liItem.remove();

        btnClear.addEventListener('click', clearFun)

        function clearFun(e) {
          e.preventDefault();
          liRes.remove();
        }
      }
    }
  }
}




