import React from "react"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import LegislationText from "../components/legislation/legislationText"
import Layout from "../components/layout/layout"
import { isPastEndDate } from "../util/dateCompare"
import { CONTEST_PAGE_URL, EDITOR_PAGE_URL } from "../constants"
import { fetchLegislation } from '../actions/legislationActions'

class LegislationPage extends React.Component {

  componentDidMount () {
    this.props.dispatch(fetchLegislation(this.props.match.params.id))
  }

  render() {
    var legislation = this.props.legislation

    return (
      <Layout>
        {legislation
        ? <>
          <Link to={CONTEST_PAGE_URL + "/" + legislation.contest.id}>
            {"< Back to " + legislation.contest.title + " Contest"}
            </Link>
          <br />
          <br />
          <LegislationText
            title={legislation.title}
            chapter={legislation.chapter}
            section={legislation.section}
            accomplishes={legislation.accomplishes}
            terms={legislation.terms}
            purpose={legislation.purpose}
            provisions={legislation.provisions}
            competition={legislation.competition}
            other={legislation.other}
            exceptions={legislation.exceptions}
          />
          {(this.props.isAuthenticated && this.props.email === this.props.legislation.author.email)
          ? <>
              <Link 
                to={EDITOR_PAGE_URL + "/legislation/" + legislation.id}
              >
                <Button
                  className="mt-3"
                  variant={isPastEndDate(legislation.contest.endDate) ? "secondary" : "turq"}
                  size="lg"
                  disabled={isPastEndDate(legislation.contest.endDate)}
                >
                  Update this legislation
                </Button>
              </Link>
            </>
          : <></> }
          </>
          : <></> }
      </Layout>
    )
  }
}

function mapStateToProps(state) {

  var { legislation, auth } = state
  legislation = legislation.legislation

  const { isAuthenticated, email } = auth

  return {
    legislation,
    isAuthenticated,
    email
  }
}

export default connect(mapStateToProps)(LegislationPage)