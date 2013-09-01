/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package org.mifosplatform.portfolio.charge.domain;

public enum ChargeTimeType {

    INVALID(0, "chargeTimeType.invalid"), //
    DISBURSEMENT(1, "chargeTimeType.disbursement"), //
    SPECIFIED_DUE_DATE(2, "chargeTimeType.specifiedDueDate");

    private final Integer value;
    private final String code;

    private ChargeTimeType(Integer value, String code) {
        this.value = value;
        this.code = code;
    }

    public Integer getValue() {
        return value;
    }

    public String getCode() {
        return code;
    }

    public static ChargeTimeType fromInt(final Integer chargeTime) {
        ChargeTimeType chargeTimeType = ChargeTimeType.INVALID;
        switch (chargeTime) {
            case 1:
                chargeTimeType = DISBURSEMENT;
            break;
            case 2:
                chargeTimeType = SPECIFIED_DUE_DATE;
            break;
            default:
                chargeTimeType = INVALID;
            break;
        }
        return chargeTimeType;
    }

    public boolean isTimeOfDisbursement() {
        return ChargeTimeType.DISBURSEMENT.getValue().equals(this.value);
    }
}