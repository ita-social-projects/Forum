import { Select, Space } from 'antd';
import { PropTypes } from 'prop-types';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';
import css from './MultipleSelectChip.module.css';


export default function MultipleSelectChip(props) {

  return (
    <div className={css['fields__column']}>
      <div className={css['fields__label']}>
        {props.requredField && <label className={css['fields__label--required']}>*</label>}
        <label
          className={`${css['fields__label--text']} ${!props.requredField && css['fields__field--notrequired']}`}
        >
          {props.label}
        </label>
      </div>
      <Space>
        <Select
          mode="multiple"
          name={props.name}
          value={props.value}
          placeholder="Оберіть"
          variant="borderless"
          className={css['select-container']}
          dropdownStyle={{
            width:'257px',
            paddingLeft: '0px',
            paddingRight: '0px',
            borderRadius: '2px',
          }}
          onChange={props.updateHandler}
          onKeyDown={preventEnterSubmit}
          options={props.options.map(option => ({
            value: option.name ?? option.name_ukr,
          }))}
        />
      </Space>
        {props.requredField &&
        <div className={css['error-message']}>
          {props.error}
        </div>
      }
    </div>
  );
}

MultipleSelectChip.propTypes = {
    requredField: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.array,
    options: PropTypes.array,
    updateHandler: PropTypes.func.isRequired,
    error:PropTypes.string,
};