import { ChangeEvent, useState } from "react";

import HomeLink from "../home-link";

enum LoanType {
  Vehicle = "Vehicle",
  Property = "Property",
}

type LoanOptions = {
  installments: number[];
  minLoan: number;
  maxLoan: number;
  minGuarantee: number;
  maxGuarantee: number;
};
const LOAN_OPTIONS: Record<LoanType, LoanOptions> = {
  [LoanType.Vehicle]: {
    installments: [24, 36, 48],
    minLoan: 3000,
    maxLoan: 100000,
    minGuarantee: 5000,
    maxGuarantee: 3000000,
  },
  [LoanType.Property]: {
    installments: [120, 180, 240],
    minLoan: 30000,
    maxLoan: 4500000,
    minGuarantee: 50000,
    maxGuarantee: 100000000,
  },
};

const getLoanAmtFromGuarantee = (
  guarantee: number,
  min: number,
  max: number,
) => {
  const amount = Math.floor(guarantee * 0.8);
  if (amount < min) {
    return min;
  } else if (amount > max) {
    return max;
  }
  return amount;
};

const getInstallments = (loanAmt: number, months: number) => {
  const total = Math.round((0.0638 + 0.0234 + months / 1000 + 1) * loanAmt);
  const monthlyAmt = Math.round(total / months);
  return {
    total,
    monthlyAmt,
  };
};

const Installments = () => {
  const [loanType, setLoanType] = useState(LoanType.Vehicle);
  const loan = LOAN_OPTIONS[loanType];
  const installmentOptions = loan.installments;
  const [installment, setInstallment] = useState(installmentOptions[0]);
  const [guarantee, setGuarantee] = useState(loan.minGuarantee);
  const amount = guarantee * 0.8;
  const maxLoan = Math.min(amount, loan.maxLoan);
  const minLoan = Math.min(amount, loan.minLoan);
  const [loanAmt, setLoanAmt] = useState(
    getLoanAmtFromGuarantee(guarantee, loan.minLoan, loan.maxLoan),
  );
  const [installmentAmount, setInstallmentAmount] = useState(
    getInstallments(loanAmt, installment),
  );

  const handleGuaranteeChange = (ev: ChangeEvent) => {
    let val = parseFloat((ev?.target as HTMLInputElement)?.value);
    val = val < loan.minGuarantee ? loan.minGuarantee : val;
    val = val > loan.maxGuarantee ? loan.maxGuarantee : val;
    setGuarantee(isNaN(val) ? loan.minGuarantee : val);
    const newLoanAmt = isNaN(val)
      ? getLoanAmtFromGuarantee(loan.minGuarantee, loan.minLoan, loan.maxLoan)
      : getLoanAmtFromGuarantee(val, loan.minLoan, loan.maxLoan);
    setLoanAmt(newLoanAmt);

    setInstallmentAmount(getInstallments(newLoanAmt, installment));
  };

  const handleLoanChange = (ev: ChangeEvent) => {
    const val = parseFloat((ev?.target as HTMLInputElement)?.value);
    const newLoanAmt = isNaN(val) ? loan.minLoan : val;
    setLoanAmt(newLoanAmt);
    setInstallmentAmount(getInstallments(newLoanAmt, installment));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <header className="bg-green-400 p-2">
        <HomeLink />
        <h1 className="text-4xl text-white font-bold p-2">Creditas</h1>
      </header>
      <div className="flex flex-col bg-gray-100 w-full h-screen my-2">
        <div className="flex flex-row w-full mx-2">
          <div className="w-1/2 flex flex-col">
            <label
              htmlFor="installments"
              className="font-bold text-2xl text-center"
            >
              Installments
            </label>
            <select
              value={installment}
              className="text-2xl text-center p-2 rounded-lg my-2"
              id="installments"
              onChange={(ev) => {
                const newInstallment = parseInt(
                  (ev?.target as HTMLSelectElement)?.value,
                );
                setInstallment(newInstallment);
                setInstallmentAmount(getInstallments(loanAmt, newInstallment));
              }}
            >
              {installmentOptions.map((io, i: number) => {
                return (
                  <option value={io} key={`installment-${i}`}>
                    {io}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-1/2 flex flex-col mx-2">
            <label
              htmlFor="collateral"
              className="font-bold text-2xl text-center"
            >
              Collateral Type
            </label>
            <select
              value={loanType}
              className="text-2xl text-center p-2 rounded-lg my-2"
              id="collateral"
              onChange={(ev) => {
                const newLoanType = (ev?.target as HTMLSelectElement)
                  ?.value as LoanType;
                const newLoan = LOAN_OPTIONS[newLoanType];
                setLoanType(newLoanType);
                setGuarantee(newLoan.minGuarantee);
                setLoanAmt(
                  getLoanAmtFromGuarantee(
                    guarantee,
                    newLoan.minLoan,
                    newLoan.maxLoan,
                  ),
                );
                setInstallmentAmount(
                  getInstallments(newLoan.minLoan, newLoan.installments[0]),
                );
              }}
            >
              <option value={LoanType.Vehicle}>{LoanType.Vehicle}</option>
              <option value={LoanType.Property}>{LoanType.Property}</option>
            </select>
          </div>
        </div>
        <hr className="border-2" />
        <fieldset className="flex flex-col w-full mx-2 my-4 items-center">
          <legend className="font-bold text-2xl text-center">Guarantee</legend>
          <div className="w-full flex flex-row items-center justify-center">
            <input
              id="guarantee-amount"
              aria-label="Enter guarantee"
              type="number"
              className="text-2xl text-center p-2 rounded-lg m-2"
              min={loan.minGuarantee}
              max={loan.maxGuarantee}
              value={guarantee}
              onChange={handleGuaranteeChange}
            />
            <input
              id="guarantee-selector"
              type="range"
              aria-label="Set guarantee"
              className="text-2xl text-center p-2 rounded-lg my-2"
              min={loan.minGuarantee}
              max={loan.maxGuarantee}
              step="100"
              value={guarantee}
              onChange={handleGuaranteeChange}
            />
          </div>
        </fieldset>
        <hr className="border-2" />
        <fieldset className="flex flex-col w-full mx-2 my-4 items-center">
          <legend className="font-bold text-2xl text-center">
            Loan Amount
          </legend>
          <div className="w-full flex flex-row items-center justify-center">
            <input
              id="loan-amount"
              aria-label="Enter loan"
              type="number"
              className="text-2xl text-center p-2 rounded-lg m-2"
              min={minLoan}
              max={maxLoan}
              value={loanAmt}
              onChange={handleLoanChange}
            />
            <input
              id="loan-selector"
              type="range"
              aria-label="Set loan"
              className="text-2xl text-center p-2 rounded-lg my-2"
              min={minLoan}
              max={maxLoan}
              step="100"
              value={loanAmt}
              onChange={handleLoanChange}
            />
          </div>
        </fieldset>
        <div className="flex flex-col bg-white rounded shadow-lg border-2 border-green-400 p-2 m-2 items-center justify-centers">
          <p className="text-xl font-bold p-2">Monthly Installments</p>
          <p className="text-4xl text-green-400 font-bold p-2">
            {installmentAmount.monthlyAmt}
          </p>
          <p className="text-lg p-2">
            Total payments: {installmentAmount.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Installments;
