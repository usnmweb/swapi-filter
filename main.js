async function fetchAllPeople() {
  let people = [];
  let url = "http://swapi.dev/api/people/";

  while (url) {
    const resp = await fetch(url);
    const { results, next } = await resp.json();
    people = people.concat(results);
    url = next;
  }

  return people;
}

function renderList(elements) {
  const listGroup = document.querySelector(".list-group");
  listGroup.innerHTML = "";

  for (const el of elements) {
    listGroup.appendChild(el);
  }
}

let people = await fetchAllPeople();
const peopleWithHtml = [];

for (const person of people) {
  const listItem = document.createElement("a");
  listItem.className = "list-group-item list-group-item-action";
  listItem.textContent = person.name;

  const personWithHtml = { ...person, html: listItem };
  listItem.addEventListener("click", () => renderCard(personWithHtml));

  peopleWithHtml.push(personWithHtml);
}

console.log({ peopleWithHtml });

renderList(peopleWithHtml.map(({ html }) => html));
/* renderCard(peopleWithHtml[0]); */

let nameFilter = "";

const nameInput = document.getElementById("nameInput");
nameInput.addEventListener("keyup", (e) => {
  nameFilter = e.target.value.toLowerCase();
  console.log(nameFilter);

  const filteredList = peopleWithHtml.filter((p) =>
    p.name.toLowerCase().includes(nameFilter)
  );

  renderList(filteredList.map((el) => el.html));

  console.log(filteredList);
});

const filmSelect = document.getElementById("filmSelect");
filmSelect.addEventListener("change", (e) => {
  let selectedValue = e.target.value;

  const oneFilm = peopleWithHtml.filter((p) => p.films.includes(selectedValue));

  console.log("one", oneFilm);

  console.log("test value", selectedValue);
});

/* console.log(
  "xx",
  peopleWithHtml.map((el) => el.films)
); */
