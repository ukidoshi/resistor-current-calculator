import {
  countModelPrefixes,
  groupAnagrams
} from "../../homework.js";

export class HomeworkCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    const prefixWords = ["c", "cf", "cfr", "v", "vish", "mf", "mfr", "bo"];
    const cleanModel = data.model.replace(/[^a-zA-Z]/g, "");
    const prefixCount = countModelPrefixes(prefixWords, cleanModel);

    const codes = ["rest", "tres", "tser", "ohm", "mho", "amp", "pam", "map"];
    const anagrams = groupAnagrams(codes);

    let groupsText = "";
    anagrams.forEach(function (group) {
      groupsText += `<li class="list-group-item calc-list-item">${group.join(", ")}</li>`;
    });

    return `
      <div class="card shadow-sm request-card mt-3">
        <div class="card-body">
          <h5 class="card-title mb-3">Аналитика по теме (ДЗ)</h5>
          <p class="mb-2">
            Слова-префиксы модели <b>${cleanModel}</b>:
            <b>${prefixCount}</b> из ${prefixWords.length}
            (искали: ${prefixWords.join(", ")})
          </p>
          <p class="mb-2">Группы анаграмм кодов резисторов:</p>
          <ul class="list-group">${groupsText}</ul>
        </div>
      </div>
    `;
  }

  render(data) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
  }
}
