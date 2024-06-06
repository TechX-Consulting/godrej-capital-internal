export default async function decorate() {
  const container = document.querySelector('.emicalculator-container');

  function createElement(type, attributes = {}, ...children) {
    const element = document.createElement(type);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
      
    children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
      
    return element;
  }

    const header = createElement('div', { class: 'header' },
    createElement('h1', {}, 'Loan Calculator'),
    createElement('button', {},
      createElement('i', { class: 'bi bi-list' })
    )
  );

  // Get the meta value from the meta tag
  // function getMetaContentByName(name) {
  //     const metaTag = document.querySelector(`meta[name="${name}"]`);
  //     return metaTag ? metaTag.getAttribute('content') : null;
  // }

  function getDataAttributeValueByName(name) {
    const element = document.querySelector(`[data-${name}]`);
    return element ? element.getAttribute(`data-${name}`) : null;
  }

  const loanAmountMaxValue = getDataAttributeValueByName('laonamount-maxvalue');
  const loanAmountMinValue = getDataAttributeValueByName('laonamount-minvalue');
  const laonamount_title = getDataAttributeValueByName('laonamount-title');
  const interestrate_maxvalue = getDataAttributeValueByName('interestrate-maxvalue');
  const interestrate_minvalue = getDataAttributeValueByName('interestrate-minvalue');
  const interestrate_title = getDataAttributeValueByName('interestrate-title');
  const tenure_title_year = getDataAttributeValueByName('tenure-title-year');
  const tenure_min_yearvalue = getDataAttributeValueByName('tenure-min-yearvalue');
  const tenure_max_yearvalue = getDataAttributeValueByName('tenure-max-yearvalue');
  const tenure_title_months = getDataAttributeValueByName('tenure-title-months');
  const tenure_min_monthvalue = getDataAttributeValueByName('tenure-min-monthvalue');
  const tenure_max_monthvalue = getDataAttributeValueByName('tenure-max-monthvalue');

  const amountDetail = createElement('div', {},
    createElement('div', { class: 'detail' },
      createElement('p', { style: 'color: #9088D2' }, laonamount_title),
            createElement('div', { class: "inputDetail" },
        createElement('span', { class: "rupeeSpan" }, "Rs"),
        createElement('input', { id: 'loan-amt-text', type: 'number', min: loanAmountMinValue, max: loanAmountMaxValue, step: '50000', style: 'color: #6258A8' })
      )
    ),
    createElement('input', { type: 'range', id: 'loan-amount', min: loanAmountMinValue, max: loanAmountMaxValue, step: '50000' }),
    createElement('div', { class: 'range-values' },
      createElement('p', { class: 'min-value' }, loanAmountMinValue),
      createElement('p', { class: 'max-value', style: 'float: right;' }, loanAmountMaxValue))
  );

  const interestDetail = createElement('div', {},
    createElement('div', { class: 'detail' },
      createElement('p', { style: 'color: #9088D2' }, interestrate_title),
            createElement('div', { class: "inputDetail" },
        createElement('span', { class: "percentSpan" }, "%"),
        createElement('input', { id: 'interest-rate-text', type: 'number', min: interestrate_minvalue, max: interestrate_maxvalue, step: '0.5', style: 'color: #6258A8' })
      )
    ),
    createElement('input', { type: 'range', id: 'interest-rate', min: interestrate_minvalue, max: interestrate_maxvalue, step: '0.5' }),
    createElement('div', { class: 'range-values' },
      createElement('p', { class: 'min-value' }, interestrate_minvalue + "%"),
      createElement('p', { class: 'max-value', style: 'float: right;' }, interestrate_maxvalue + "%"))
  );

  const tenureYearsDetail = createElement('div', {},
    createElement('div', { class: 'detail' },
      createElement('p', { style: 'color: #9088D2' }, tenure_title_year),
      createElement('div', { class: "inputDetail" },
        createElement('span', { class: "yearSpan" }, "Yrs."),
        createElement('input', { id: 'loan-period-text', type: 'number', min: tenure_min_yearvalue, max: tenure_max_yearvalue, step: '1', style: 'color: #6258A8' })
      )
        ),
    createElement('input', { type: 'range', id: 'loan-period', min: tenure_min_yearvalue, max: tenure_max_yearvalue, step: '1' }),
    createElement('div', { class: 'range-values' },
      createElement('p', { class: 'min-value' }, tenure_min_yearvalue + " Year"),
      createElement('p', { class: 'max-value', style: 'float: right;' }, tenure_max_yearvalue + " Year"))
  );

  const tenureMonthsDetail = createElement('div', {},
    createElement('div', { class: 'detail' },
      createElement('p', { style: 'color: #9088D2' }, tenure_title_months),
      createElement('div', { class: "inputDetail" },
        createElement('span', { class: "monthSpan" }, "Mos."),
        createElement('input', { id: 'loan-period-month-text', type: 'number', min: tenure_min_monthvalue, max: tenure_max_monthvalue, step: '1', style: 'color: #6258A8' })
      )
    ),
    createElement('input', { type: 'range', id: 'loan-period-month', min: tenure_min_monthvalue, max: tenure_max_monthvalue, step: '1' }),
    createElement('div', { class: 'range-values' },
      createElement('p', { class: 'min-value' }, tenure_min_monthvalue + " Month"),
      createElement('p', { class: 'max-value', style: 'float: right;' }, tenure_max_monthvalue + " Month"))
  );

  const details = createElement('div', { class: 'details' },
    amountDetail, interestDetail, tenureYearsDetail, tenureMonthsDetail
  );

  const footer = createElement('div', { class: 'footer' },
    createElement('div', { style: 'chart-detail' },
      createElement('p', { id: 'price-container-emi' }, "Your Monthly Emi",
        createElement('p', { id: 'price' }, '0'),
      )
    )
  );

  const view = createElement('div', { class: 'view' }, details, footer);

  const breakup = createElement('div', { class: 'breakup' },
    createElement('canvas', { id: 'pieChart' })
  );

  const subContainer = createElement('div', { class: 'sub-container' }, view, breakup);

  const loanDetails = createElement('div', { class: 'loan-details' },
    createElement('div', { class: 'chart-details' },
      createElement('p', { style: 'color: #9088D2' }, 'Principal'),
      createElement('p', { id: 'cp', style: 'color: #130F31; font-size: 17px;' })
    ),
    createElement('div', { class: 'chart-details' },
      createElement('p', { style: 'color: #9088D2' }, 'Interest'),
      createElement('p', { id: 'ci', style: 'color: #130F31; font-size: 17px;' })
    ),
    createElement('div', { class: 'chart-details' },
      createElement('p', { style: 'color: #9088D2' }, 'Total Payable'),
      createElement('p', { id: 'ct', style: 'color: #130F31; font-size: 17px;' })
    ),
  );
  loanDetails.appendChild(footer);

  container.append(header, subContainer, loanDetails);

  let P, R, N, M, pie, line;
  const loan_amt_slider = document.getElementById("loan-amount");
  const loan_amt_text = document.getElementById("loan-amt-text");
  const int_rate_slider = document.getElementById("interest-rate");
  const int_rate_text = document.getElementById("interest-rate-text");
  const loan_period_slider = document.getElementById("loan-period");
  const loan_period_text = document.getElementById("loan-period-text");
  const loan_period_slider_month = document.getElementById("loan-period-month");
  const loan_period_text_month = document.getElementById("loan-period-month-text");


  loan_amt_slider.addEventListener("change", (self) => {
    loan_amt_text.value = self.target.value;
    P = parseFloat(self.target.value);
    displayDetails();
  });

  loan_amt_text.addEventListener("blur", (self) => {
    loan_amt_slider.value = self.target.value;
    P = parseFloat(self.target.value);
    displayDetails();
  });

  int_rate_slider.addEventListener("change", (self) => {
    int_rate_text.value = self.target.value;
    R = parseFloat(self.target.value);
    displayDetails();
  });

  int_rate_text.addEventListener("blur", (self) => {
    int_rate_slider.value = self.target.value;
    R = parseFloat(self.target.value);
    displayDetails();
  });

  loan_period_slider.addEventListener("change", (self) => {
    loan_period_text.value = self.target.value;
    N = parseFloat(self.target.value);
    displayDetails();
  });

  loan_period_text.addEventListener("blur", (self) => {
    loan_period_slider.value = self.target.value;
    N = parseFloat(self.target.value);
    displayDetails();
  });

  loan_period_slider_month.addEventListener("change", (self) => {
    loan_period_text_month.value = self.target.value;
    M = parseFloat(self.target.value);
    displayDetails();
  });

  loan_period_text_month.addEventListener("blur", (self) => {
    loan_period_slider_month.value = self.target.value;
    M = parseFloat(self.target.value);
    displayDetails();
  });


    //error message
  function createErrorSpan(message) {
    return createElement('span', { class: 'error-message', style: 'color: red; display: none;' }, message);
  }

  // Error message spans
  const loanAmtError = createErrorSpan("Value should be between " + loanAmountMinValue + " and " + loanAmountMaxValue);
  const interestRateError = createErrorSpan("Value should be between " + interestrate_minvalue + "% and " + interestrate_maxvalue + "%");
  const loanPeriodError = createErrorSpan("Value should be between " + tenure_min_yearvalue + " and " + tenure_max_yearvalue);
  const loanPeriodMonthError = createErrorSpan("Value should be between " + tenure_min_monthvalue + " and " + tenure_max_monthvalue);

  // Append error message spans to their respective input containers
  amountDetail.appendChild(loanAmtError);
  interestDetail.appendChild(interestRateError);
  tenureYearsDetail.appendChild(loanPeriodError);
  tenureMonthsDetail.appendChild(loanPeriodMonthError);

  // Event listeners for input elements to validate input values

  //error for loan amount
  loan_amt_text.addEventListener("input", function () {
    if (parseFloat(this.value) < parseFloat(loanAmountMinValue) || parseFloat(this.value) > parseFloat(loanAmountMaxValue)) {
      loanAmtError.style.display = "block";
    } else {
      loanAmtError.style.display = "none";
      }
  });

  //error for loan amount
  int_rate_text.addEventListener("input", function () {
    if (parseFloat(this.value) < parseFloat(interestrate_minvalue) || parseFloat(this.value) > parseFloat(interestrate_maxvalue)) {
      interestRateError.style.display = "block";
    } else {
      interestRateError.style.display = "none";
    }
  });

  //error for year
  loan_period_text.addEventListener("input", function () {
    if (parseFloat(this.value) < parseFloat(tenure_min_yearvalue) || parseFloat(this.value) > parseFloat(tenure_max_yearvalue)) {
       loanPeriodError.style.display = "block";
    } else {
      loanPeriodError.style.display = "none";
    }
  });

  //error for month
  loan_period_text_month.addEventListener("input", function () {
    if (parseFloat(this.value) < parseFloat(tenure_min_monthvalue) || parseFloat(this.value) > parseFloat(tenure_max_monthvalue)) {
      loanPeriodMonthError.style.display = "block";
    } else {
      loanPeriodMonthError.style.display = "none";
    }
  });


  function calculateLoanDetails(p, r, emi, n, m) {
    let totalInterest = 0;
    let yearlyInterest = [];
    let yearPrincipal = [];
    let years = [];
    let year = 1;
    let [counter, principal, interest] = [0, 0, 0];
    let totalMonths = n * 12 + m;
    for (let i = 0; i < totalMonths; i++) {
      let monthlyInterest = p * r;
      p = p - (emi - monthlyInterest);
      totalInterest += monthlyInterest;
      principal += emi - monthlyInterest;
      interest += monthlyInterest;
      if (++counter == 12) {
        years.push(year++);
        yearlyInterest.push(parseInt(interest));
        yearPrincipal.push(parseInt(principal));
        counter = 0;
      }
    }
    line.data.datasets[0].data = yearPrincipal;
    line.data.datasets[1].data = yearlyInterest;
    line.data.labels = years;
    return totalInterest;
  }

  function displayDetails() {
    let r = parseFloat(R) / 1200;
    let n = parseFloat(N);
    let m = parseFloat(M);
    let totalMonths = n * 12 + m;

    let num = P * r * Math.pow(1 + r, totalMonths);
    let denom = Math.pow(1 + r, totalMonths) - 1;
    let emi = num / denom;

    let payableInterest = calculateLoanDetails(P, r, emi, n, m);

    let opts = { style: "currency", currency: "INR" };

    document.querySelector("#cp").innerText =
            P.toLocaleString("en-IN", opts);

    document.querySelector("#ci").innerText =
            payableInterest.toLocaleString("en-IN", opts);

    document.querySelector("#ct").innerText =
            (P + payableInterest).toLocaleString("en-IN", opts);

    document.querySelector("#price").innerText =
            emi.toLocaleString("en-IN", opts);

    pie.data.datasets[0].data[0] = P;
    pie.data.datasets[0].data[1] = payableInterest;
    pie.update();
    line.update();
  }

  function initialize() {
    loan_amt_slider.value = loanAmountMinValue;
    loan_amt_text.value = loanAmountMinValue;
    P = parseFloat(loanAmountMinValue);

    int_rate_slider.value = interestrate_minvalue;
    int_rate_text.value = interestrate_minvalue;
    R = parseFloat(interestrate_minvalue);

    loan_period_slider.value = tenure_min_yearvalue;
    loan_period_text.value = tenure_min_yearvalue;
    N = parseFloat(tenure_min_yearvalue);

    loan_period_slider_month.value = tenure_min_monthvalue;
    loan_period_text_month.value = tenure_min_monthvalue;
    M = parseFloat(tenure_min_monthvalue);

    line = new Chart(document.getElementById("lineChart"), {
      data: {
        labels: [],
        datasets: [
          {
            label: "Principal",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [],
          },
        {
            label: "Interest",
            backgroundColor: "rgb(54, 162, 235)",
            borderColor: "rgb(54, 162, 235)",
            data: [],
          },
        ],
      },
      type: "line",
      options: {
        scales: {
          y: {
            ticks: {
              callback: function (val) {
                return val.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                });
              },
            },
          },
        },
      },
    });

    pie = new Chart(document.getElementById("pieChart"), {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [
          {
            data: [P, 0],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            hoverOffset: 4,
          },
        ],
      },
    });

    displayDetails();
  }

  initialize();
}
