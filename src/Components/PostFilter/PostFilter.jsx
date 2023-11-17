import MySelect from "../UI/select/MySelect"

import { MyInput } from "../UI/input/MyInput"

export function PostFilter({filter, setFilter}) {
    return(  <div>
        <hr style={{ margin: "15px 0" }}></hr>
        <MyInput
          placeholder="Поиск"
          value={filter.query}
          onChange={(e) => setFilter({...filter, query: e.target.value})}
        />
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue={"Сортировка"}
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </div>)
}