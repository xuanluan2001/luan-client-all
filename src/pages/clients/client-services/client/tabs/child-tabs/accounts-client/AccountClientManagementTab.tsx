import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import InputSearch from "../../../../../../../components/input/input-search/InputSearch";
import SearchPage from "../../../../../../../components/search-page/SearchPage";
import TableCutom, {
  ColumnCustom,
} from "../../../../../../../components/table-custom/TableCustom";
import SearchFilter from "../../../../../../../utils/search/SearchFilter";
import { searchUser } from "../../../../../../../utils/service-api/auth-service-api";
import { User, UserFilter } from "../../../../../../../utils/types/authType";
import { ResultList } from "../../../../../../../utils/types/baseType";
import { useContextClientId } from "../../../ClientDetail";

const columns: ColumnCustom[] = [
  { field: "id", header: "Mã tài khoản" },
  { field: "orgId", header: "Mã tổ chức" },
  { field: "authProvider", header: "Loại tài khoản" },
  { field: "createdBy", header: "Nguời tạo" },
  { field: "createdAt", header: "Ngày tạo" },
];

const AccountClientManagementTab = () => {
  const outletContext = useContextClientId();
  const [result, setResult] = useState<ResultList<User>>();
  const { filter, changePageFilter, handleFilter } = SearchFilter<UserFilter>({
    search: "",
    offset: 0,
    maxResult: 20,
  });

  useEffect(() => {
    searchUser(outletContext.clientId, "all", filter).then((data) => {
      setResult(data.data?.data);
    });
  }, [filter.offset, filter.maxResult, outletContext.clientId]);

  return (
    <>
      {result && (
        <Col className="main">
          <div className="main-header">
            <Row>
              <Col sm={12} lg={4} xl={5}>
                <h4 className="mt-1">Danh Sách Tài khoản của tổ chức</h4>
              </Col>
              <Col sm={12} lg={4} xl={4}>
                <Form>
                  <InputSearch
                    icon="fa-solid fa-magnifying-glass"
                    placeHolder="Tìm kiếm"
                    name="search"
                    value={filter.search}
                    handleChange={handleFilter}
                  />
                </Form>
              </Col>
            </Row>
            <TableCutom data={result} columns={columns} />
            <SearchPage
              dataResult={result}
              handleChange={handleFilter}
              changePageClick={changePageFilter}
            />
          </div>
        </Col>
      )}
    </>
  );
};

export default AccountClientManagementTab;
