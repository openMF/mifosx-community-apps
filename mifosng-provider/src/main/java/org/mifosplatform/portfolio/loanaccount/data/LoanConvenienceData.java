/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package org.mifosplatform.portfolio.loanaccount.data;

public class LoanConvenienceData {

	private final int maxSubmittedOnOffsetFromToday;
	private final int maxApprovedOnOffsetFromToday;
	private final int maxDisbursedOnOffsetFromToday;
	private final int expectedLoanTermInDays;
	private final int actualLoanTermInDays;
	private final int expectedLoanTermInMonths;
	private final int actualLoanTermInMonths;

	public LoanConvenienceData(int maxSubmittedOnOffsetFromToday,
			int maxApprovedOnOffsetFromToday,
			int maxDisbursedOnOffsetFromToday, int expectedLoanTermInDays,
			int actualLoanTermInDays, int expectedLoanTermInMonths,
			int actualLoanTermInMonths) {
		this.maxSubmittedOnOffsetFromToday = maxSubmittedOnOffsetFromToday;
		this.maxApprovedOnOffsetFromToday = maxApprovedOnOffsetFromToday;
		this.maxDisbursedOnOffsetFromToday = maxDisbursedOnOffsetFromToday;
		this.expectedLoanTermInDays = expectedLoanTermInDays;
		this.actualLoanTermInDays = actualLoanTermInDays;
		this.expectedLoanTermInMonths = expectedLoanTermInMonths;
		this.actualLoanTermInMonths = actualLoanTermInMonths;
	}

	public int getMaxSubmittedOnOffsetFromToday() {
		return maxSubmittedOnOffsetFromToday;
	}

	public int getMaxApprovedOnOffsetFromToday() {
		return maxApprovedOnOffsetFromToday;
	}

	public int getMaxDisbursedOnOffsetFromToday() {
		return maxDisbursedOnOffsetFromToday;
	}

	public int getExpectedLoanTermInDays() {
		return expectedLoanTermInDays;
	}

	public int getActualLoanTermInDays() {
		return actualLoanTermInDays;
	}

	public int getExpectedLoanTermInMonths() {
		return expectedLoanTermInMonths;
	}

	public int getActualLoanTermInMonths() {
		return actualLoanTermInMonths;
	}
}