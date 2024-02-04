import React from "react";
import Table from "react-bootstrap/Table"
import Place from "./Place"
import { useState, useMemo } from "react";
import Pagination from "./Pagination";

const PlaceList = ({ currentUser, currentUserPlaces }) => {
    //const [items, setItems] = useState(places)
    // console.log(places)
    let PageSize = 3
    const [currentPageV2, setCurrentPageV2] = useState(1)
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPageV2 - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return currentUserPlaces.slice(firstPageIndex, lastPageIndex)
    }, [currentPageV2, currentUserPlaces])

    return (
        <>
            {currentUserPlaces ?
                <div>
                    <section className="table-top">
                        <Table className="table table-striped table-hover table-responsive table-bordered table-light " >
                            <thead>
                                <tr className="table-row">
                                    <th >
                                        Name:
                                    </th>
                                    <th >
                                        Address:
                                    </th>
                                    <th >
                                        Rating:
                                    </th>
                                    <th >
                                        Currenty Open:
                                    </th>
                                    <th >
                                        Provided Image:
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData.map((place, index) => {

                                    return (
                                        <Place
                                            key={index}
                                            place={place}
                                        />
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPageV2}
                            totalCount={currentUserPlaces.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPageV2(page)}
                        />
                    </section>
                </div>
                :
                <div>
                    No Places for this user!
                </div>
            }
        </>
    );
};

export default PlaceList;
