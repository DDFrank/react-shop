import React from "react";

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }
    // 渲染前
    componentWillMount() {
        document.title = this.props.title + ' - HAPPYMMALL' ;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 class="page-header">
                        {this.props.title}
                    </h1>
                    {this.props.children}
                </div>
            </div>
            
        );
    }
}

export default PageTitle;