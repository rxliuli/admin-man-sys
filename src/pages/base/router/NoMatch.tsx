import React from 'react'
import { Button, Card, Result } from 'antd'
import globalStyles from '../../../assets/css/global.module.css'
import classNames from 'classnames'
import { RouterProps, withRouter } from 'react-router'

type PropsType = {} & RouterProps

const NoMatch: React.FC<PropsType> = function(props: PropsType) {
  return (
    <div className={classNames(globalStyles.global, globalStyles.margin)}>
      <Card>
        <Result
          status="404"
          title="404"
          subTitle="找不到页面"
          extra={
            <Button type="primary" onClick={() => props.history.push('/')}>
              回到首页
            </Button>
          }
        />
      </Card>
    </div>
  )
}

export default withRouter(NoMatch)
