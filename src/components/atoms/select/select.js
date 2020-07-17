import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select/creatable'
import styles from './select.module.scss'
import { isEmpty } from 'lodash'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const Select = ({ label, options, placeholder, defaultValue, onChange }) => {
  const handleChange = selectedOption => {
    let categories = []
    if (!isEmpty(selectedOption)) {
      categories = selectedOption.map( ({ value }) => value.toLowerCase() )
    }
    onChange(categories)
  }
  return (
    <div>
      <div className={styles.label}>{label}</div>
      <ReactSelect
        className={styles.select}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isMulti={true}
        defaultValue={defaultValue}
      />
    </div>
  )
}
Select.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.array
}
Select.defaultProps = {
  label: "add label",
  placeholder: "",
  onChange: () => {},
  options,
  defaultValue: []
}
export default Select