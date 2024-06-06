console.log("loan eligibilty");
export default async function decorate(block) {
    console.log(block);
    var container = document.querySelector('.loaneligibility');
 
    function createElement(type, attributes = {}, ...children) {
        const element = document.createElement(type);
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
        for (const child of children) {
      if (typeof child === "string") {
              element.appendChild(document.createTextNode(child));
      } else {
            element.appendChild(child);
        }
      }
        return element;
  }
 
    const header = createElement('div', { class: 'header' },
        createElement('h1', {}, 'Loan Eligibility  Calculator'),
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
 
    const loanAmountMaxValue = getDataAttributeValueByName('income-maxvalue');
    const loanAmountMinValue = getDataAttributeValueByName('income-minvalue');
    const laonamount_title = getDataAttributeValueByName('income-title');
 
    const existing_emi_title=getDataAttributeValueByName('existing-emi-title');
    const existing_emi_min=getDataAttributeValueByName('existing-emi-min');
    const existing_emi_max=getDataAttributeValueByName('existing-emi-max');
 
    // console.log(existing_emi_title,existing_emi_min,existing_emi_max);
 
    const interestrate_maxvalue = getDataAttributeValueByName('interestrate-maxvalue');
    const interestrate_minvalue = getDataAttributeValueByName('interestrate-minvalue');
    const interestrate_title = getDataAttributeValueByName('interestrate-title');
    const tenure_title_year = getDataAttributeValueByName('tenure-title-year');
    const tenure_min_yearvalue = getDataAttributeValueByName('tenure-min-yearvalue');
    const tenure_max_yearvalue = getDataAttributeValueByName('tenure-max-yearvalue');
    const tenure_title_months = getDataAttributeValueByName('tenure-title-months');
    const tenure_min_monthvalue = getDataAttributeValueByName('tenure-min-monthvalue');
    const tenure_max_monthvalue = getDataAttributeValueByName('tenure-max-monthvalue');
    const redirectionPath = getDataAttributeValueByName('redirectionPath');
    const product_list = getDataAttributeValueByName('product-list');
    


     // Create a select element
     var selectProduct = document.createElement("select");

      // Split the string into an array of loan options
    var optionsArray = product_list.split(",");

    // Loop through the array and create option elements
    for(var i = 0; i < optionsArray.length; i++) {
        var option = document.createElement("option");
        option.value = optionsArray[i].toLowerCase().replace(/ /g, '-');
        option.text = optionsArray[i];
        selectProduct.appendChild(option);
    }
 
    const amountDetail = createElement('div', {},
        createElement('div', { class: 'detail' },
            createElement('p', { style: 'color: #9088D2' }, laonamount_title),
            createElement('div',{class:"inputDetail"},
            createElement('span',{class:"rupeeSpan"},"₹"),
            createElement('input', { id: 'loan-amt-text', type: 'number', min: loanAmountMinValue, max: loanAmountMaxValue, step: '50000', style: 'color: #6258A8' })
            )
        ),
        createElement('input', { type: 'range', id: 'loan-amount', min: loanAmountMinValue, max: loanAmountMaxValue, step: '50000' }),
        createElement('div', { class: 'range-values' },
            createElement('p', { class: 'min-value' }, loanAmountMinValue),
            createElement('p', { class: 'max-value', style: 'float: right;' }, loanAmountMaxValue))
    );
 
    const existing_emi = createElement('div', {},
    createElement('div', { class: 'detail' },
        createElement('p', { style: 'color: #9088D2' }, existing_emi_title),
        createElement('div',{class:"inputDetail"},
        createElement('span',{class:"rupeeSpan"},"₹"),
        createElement('input', { id: 'exisiting-emi-text', type: 'number', min: existing_emi_min, max: existing_emi_max, step: '5', style: 'color: #6258A8' })
        )
    ),
    createElement('input', { type: 'range', id: 'exisiting-emi-amount', min: existing_emi_min, max: existing_emi_max, step: '5' }),
    createElement('div', { class: 'range-values' },
        createElement('p', { class: 'min-value' }, existing_emi_min),
        createElement('p', { class: 'max-value', style: 'float: right;' }, existing_emi_max))
);
 
    const interestDetail = createElement('div', {},
        createElement('div', { class: 'detail' },
            createElement('p', { style: 'color: #9088D2' }, interestrate_title),
            createElement('div',{class:"inputDetail"},
            createElement('span',{class:"percentSpan"},"%"),
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
            createElement('div',{class:"inputDetail"},
            createElement('span',{class:"yearSpan"},"Yrs."),
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
            createElement('div',{class:"inputDetail"},
            createElement('span',{class:"monthSpan"},"Mos."),
            createElement('input', { id: 'loan-period-month-text', type: 'number', min: tenure_min_monthvalue, max: tenure_max_monthvalue, step: '1', style: 'color: #6258A8' })
)
        ),
        createElement('input', { type: 'range', id: 'loan-period-month', min: tenure_min_monthvalue, max: tenure_max_monthvalue, step: '1' }),
        createElement('div', { class: 'range-values' },
            createElement('p', { class: 'min-value' }, tenure_min_monthvalue + " Month"),
            createElement('p', { class: 'max-value', style: 'float: right;' }, tenure_max_monthvalue + " Month"))
    );

    var applyButton = document.createElement('button');
    applyButton.textContent = 'Apply Now';
    applyButton.id = 'apply-btn';

 
    const details = createElement('div', { class: 'details' },
        selectProduct, amountDetail,existing_emi, interestDetail, tenureYearsDetail, tenureMonthsDetail, applyButton
    );
 
    const footer = createElement('div', { class: 'footer' },
        createElement('div',{style:'chart-detail'},
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
 
    var P, R, N, M, E, pie, line;
    var loan_amt_slider = document.getElementById("loan-amount");
    var loan_amt_text = document.getElementById("loan-amt-text");
   
    var exisiting_emi_text = document.getElementById("exisiting-emi-text");
    var exisiting_emi_amount_slider = document.getElementById("exisiting-emi-amount");
   
    var int_rate_slider = document.getElementById("interest-rate");
    var int_rate_text = document.getElementById("interest-rate-text");
    var loan_period_slider = document.getElementById("loan-period");
    var loan_period_text = document.getElementById("loan-period-text");
    var loan_period_slider_month = document.getElementById("loan-period-month");
    var loan_period_text_month = document.getElementById("loan-period-month-text");
   
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
   
    exisiting_emi_amount_slider.addEventListener("change", (self) => {
        exisiting_emi_text.value = self.target.value;
        E = parseFloat(self.target.value);
        displayDetails();
    });
   
    exisiting_emi_text.addEventListener("blur", (self) => {
        exisiting_emi_amount_slider.value = self.target.value;
        E = parseFloat(self.target.value);
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
    const exisitingEmiError=createErrorSpan("Value should be between"+existing_emi_min+"and "+ existing_emi_max);
    const loanPeriodError = createErrorSpan("Value should be between " + tenure_min_yearvalue + " and " + tenure_max_yearvalue);
    const loanPeriodMonthError = createErrorSpan("Value should be between " + tenure_min_monthvalue + " and " + tenure_max_monthvalue);
 
     // Append error message spans to their respective input containers
     amountDetail.appendChild(loanAmtError);
     interestDetail.appendChild(interestRateError);
     tenureYearsDetail.appendChild(loanPeriodError);
     tenureMonthsDetail.appendChild(loanPeriodMonthError);
     existing_emi.appendChild(exisitingEmiError);
   
    // Event listeners for input elements to validate input values
 
    //error for loan amount
    loan_amt_text.addEventListener("input", function() {
        if (parseFloat(this.value) < parseFloat(loanAmountMinValue) || parseFloat(this.value) > parseFloat(loanAmountMaxValue)) {
            loanAmtError.style.display = "block";
        } else {
            loanAmtError.style.display = "none";
        }
    });
 
    //error for existing emi
    exisiting_emi_text.addEventListener("input",function(){
        if(parseFloat(this.value)<parseFloat(existing_emi_min)|| parseFloat(this.value)>parseFloat(existing_emi_max)){
            exisitingEmiError.style.display="block";
        } else{
            exisitingEmiError.style.display="none";
        }
    })
 
     //error for interest amount
     int_rate_text.addEventListener("input", function() {
        if (parseFloat(this.value) < parseFloat(interestrate_minvalue) || parseFloat(this.value) > parseFloat(interestrate_maxvalue)) {
            interestRateError.style.display = "block";
        } else {
            interestRateError.style.display = "none";
            }
        });
 
     //error for year
     loan_period_text.addEventListener("input", function() {
        if (parseFloat(this.value) < parseFloat(tenure_min_yearvalue) || parseFloat(this.value) > parseFloat(tenure_max_yearvalue)) {
            loanPeriodError.style.display = "block";
        } else {
            loanPeriodError.style.display = "none";
            }
        });
 
     //error for month
     loan_period_text_month.addEventListener("input", function() {
        if (parseFloat(this.value) < parseFloat(tenure_min_monthvalue) || parseFloat(this.value) > parseFloat(tenure_max_monthvalue)) {
            loanPeriodMonthError.style.display = "block";
        } else {
            loanPeriodMonthError.style.display = "none";
            }
        });

        //Set the product type in the apply button data attributes. 
        selectProduct.addEventListener("input", function() {

            var selectedValue = this.value;
            var applyButton = document.getElementById('apply-btn');
            applyButton.setAttribute('data-product', selectedValue);

        });

        // Handle button click event to redirect with query parameter
        document.getElementById('apply-btn').addEventListener('click', function() {
            var productValue = this.getAttribute('data-product');
            if (productValue) {
                var url =  redirectionPath +'?product=' + encodeURIComponent(productValue);
                window.location.href = url;
            } else {
                var url =  redirectionPath;
                window.location.href = url;
            }
        });

    function calculateLoanDetails(p, r, n, m) {
        let totalInterest = 0;
        let yearlyInterest = [];
        let yearPrincipal = [];
        let years = [];
        let year = 1;
        let counter = 0;
        let principal = 0;
        let interes = 0;
        let totalMonths = n * 12 + m;
   
        const emi = (p * r * Math.pow((1 + r), totalMonths)) / (Math.pow((1 + r), totalMonths) - 1);
        const totalPayment = emi * totalMonths;
        totalInterest = totalPayment - p;
   
        for (let i = 0; i < totalMonths; i++) {
            let interest = p * r;
            p = p - (emi - interest);
            principal += emi - interest;
            interes += interest;
            if (++counter == 12) {
                years.push(year++);
                yearlyInterest.push(parseInt(interes));
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
   
        const emi = (P * r * Math.pow((1 + r), totalMonths)) / (Math.pow((1 + r), totalMonths) - 1);
        const payableInterest = calculateLoanDetails(P, r, n, m);
   
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
        // Set input values to their minimum values
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

 