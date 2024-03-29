import { Select, Space } from 'antd';
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
          defaultValue={props.defaultValue}
          onChange={props.updateHandler}
          options={props.options.map(option => ({
            value: option.name,
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
