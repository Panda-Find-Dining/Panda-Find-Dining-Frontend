import React, { useCallback } from "react";
import RulesStore from "./ThePasswordCheckListHelper";

interface IPasswordCheckList {
  password: string;
  passwordConfirm: string;
  icons: {
    success?: React.ElementType;
    error?: React.ElementType;
  };
  options: object;
}

const PasswordCheckListTest = ({
  password,
  passwordConfirm,
  icons,
  options,
}: IPasswordCheckList) => {
  const activeRules = useCallback(
    () =>
      new (RulesStore as any)({
        payload: {
          password,
          passwordConfirm,
        },
        ...options,
      }).getActiveRules(),
    [password, passwordConfirm, options]
  )();

  return (
    <div className="password-checklist">
      {Object.keys(activeRules).map(
        (activeRuleKey: string, activeRuleIndex: number) => {
          const Icon = (
            activeRules[activeRuleKey].valid ? icons?.success : icons?.error
          ) as React.ElementType;

          return (
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyItems: "center",
                marginTop: "15px",
              }}
              key={activeRuleIndex.toString()}
              className={`password-checklist__item${
                password || passwordConfirm
                  ? `${
                      activeRules[activeRuleKey].valid
                        ? " is-success"
                        : " is-wrong"
                    }`
                  : ""
              }`}
            >
              {(password || passwordConfirm) && Icon && (
                <span>
                  <Icon />
                </span>
              )}
              {password === "" ? null : password !== passwordConfirm ? (
                <p
                  style={{
                    margin: "auto",
                    color: "red",
                  }}
                >
                  {activeRules[activeRuleKey].nomatch}
                </p>
              ) : (
                <p
                  style={{
                    margin: "auto",
                    color: "green",
                  }}
                >
                  {activeRules[activeRuleKey].gotmatch}
                </p>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default PasswordCheckListTest;
