import usStates from "us-states";
import { countries } from "countries-list";
import styles from "./Dropdown.module.css";
import { useMemo } from "react";
import classnames from "classnames";

export const Dropdown = ({
  label,
  name,
  placeholder,
  touched,
  errors,
  handleChange,
  handleBlur,
  value,
}) => {
  // console.log(countries);
  // console.log(usStates);

  const optionsList = useMemo(() => {
    if (name === "countryRegion") {
      return Object.keys(countries)
        .sort((a, b) => countries[a].name.localeCompare(countries[b].name))
        .map((code) => countries[code].name);
    } else {
      return Object.values(usStates).sort((a, b) => a.localeCompare(b));
    }
  }, [name, countries, usStates]);

  return (
    <div className={styles.selectInformation}>
      <label htmlFor="state">{label}</label>
      <select
        as="select"
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={classnames(styles.select, {
          [styles.selectError]: touched && errors,
        })}
      >
        <option value="" hidden>
          {placeholder}
        </option>
        {optionsList.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      {touched && errors && <div className={styles.error}>{errors}</div>}
    </div>
  );
};
