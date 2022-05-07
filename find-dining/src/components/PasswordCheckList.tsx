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
              {password === "" ? (
                <></>
              ) : password !== passwordConfirm ? (
                <p>{activeRules[activeRuleKey].nomatch}</p>
              ) : (
                <p>{activeRules[activeRuleKey].gotmatch}</p>
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default PasswordCheckListTest;
