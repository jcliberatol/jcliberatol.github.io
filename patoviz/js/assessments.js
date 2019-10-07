let renderDashboard = function(d) {
    ///////////////////////////////////////////
    //Aux functions
    ///////////////////////////////////////////

    var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
    var formatTime = d3.timeFormat("%Y-%m-%d %H:%M");
    let fullname = d =>
        d.name +
        " " +
        ((d.middle_name?d.middle_name.length:0) > 0 ? d.middle_name + " " : "") +
        d.last_name;

    let addTime = function(timeUnit, time, units) {
        var sliceu = {
            Day: d3.timeDays,
            Week: d3.timeWeeks,
            Month: d3.timeMonths,
            Year: d3.timeYears
        };
        if (typeof sliceu[timeUnit] == "undefined") {
            return time;
        }
        var offsets = {
            Day: 500000000,
            Week: 5000000000,
            Month: 50000000000,
            Year: 50000000000
        };
        var t = time.valueOf();
        var tarr = sliceu[timeUnit](
            new Date(t),
            new Date(t + offsets[timeUnit])
        );
        var tdelta = tarr[1].valueOf() - tarr[0].valueOf();

        var newtime = new Date(t + tdelta * units);
        return newtime;
    };
    ///Start
    let color_scheme = d3.schemeTableau10.concat(d3.schemePaired)
    dc.config.defaultColors(color_scheme)
    let resize = function() {
        //Function to size everythin in the screen
        let sw = window.innerWidth;
        let sh = window.innerHeight;
        let ssw = screen.width;
        let sm = 900;
        let md = 1400;
        // sm md lg
        let state = ssw > md ? "lg" : ssw > sm ? "md" : "sm";
        // Chart Sizes : quarter , mid , single
        let quarter = state==="lg"?sw/4.5:state==="md"?sw/2.5:sw*0.90;
        let medium = state==="lg"?sw/2.5:state==="md"?sw/2.5:sw*0.90;
        let single = state==="lg"?sw*0.95:state==="md"?sw*0.93:sw*0.90;
        var elem = document.querySelector('#assigned_column');

        console.log("Screen : " + state + " : " + sw +" "+ sh)
        console.log("Screen w : " + screen.width)
        console.log(quarter)
        console.log(medium)
        console.log(single)

        elem.style.width = Math.round(medium) + "px";
        elem.style.height = 300 + "px"
        assigned_students_table.width(medium).height(300);
        teachers_row_chart.width(quarter).height(teachers_dim.group().top(Infinity).length * 30 + 30)
        students_row_chart.width(quarter).height(students_dim.group().top(Infinity).length * 30 + 30)
        assessments_row_chart.width(quarter).height(assessments_dim.group().top(Infinity).length * 30)
        piesection.width(quarter).height(section_scores_grouping.top(Infinity).length * 30 + 30)
        rowtypes.width(quarter).height(rtypes_scores.group().top(Infinity).length * 30 + 30);
        assessments_table.width(medium).height(300)
        staxx.width(medium).height(300)
        pie.width(quarter).height(300)
        pietypes.width(quarter).height(300)
        date_exec_chart.width(medium).height(150)
        date_fini_chart.width(medium).height(150)
        assessments_stable.width(medium).height(300)
        bp_chart.width(medium).height(250)
        bp_chart2.width(medium).height(300)
        bp_chart3.width(medium).height(300)
        date_scores.width(quarter).height(300)



    }
    //d is the datum array
    console.log(d);
    //We have four datums
    let students_teacher = d[0];
    let students_assessments = d[1];
    let students_scores = d[2];
    let status_list = ["FINISHED", "IN_PROGRESS","INVALID", "ASSIGNED"];
    let status_color_map = {"FINISHED":color_scheme[0], "IN_PROGRESS":color_scheme[1], "INVALID":color_scheme[2], "ASSIGNED":color_scheme[3]};

    for (var i = 0; i < students_assessments.length; i++) {
        let sais = students_assessments[i].status;
        if (sais === "NULL") {
            students_assessments[i].status = "ASSIGNED";
        }
        let exd = students_assessments[i].execution_date;
        let fid = students_assessments[i].finish_date;

        students_assessments[i].execution_date = parseTime(exd);
        students_assessments[i].finish_date = parseTime(fid);
    }

    for (var i = 0; i < students_scores.length; i++) {
        let ss = students_scores[i];
        ss.score_value = Number(ss.score_value);
        ss.isPercent = false;
        if (ss.score_label == "Percentage") {
            ss.isPercent = true;
        }
        if (ss.score_label == "score_subcategory") {
            ss.isPercent = true;
        }
        if (ss.score_label == "TOTAL Percentage") {
            ss.isPercent = true;
        }
        let exd = ss.execution_date;
        let fid = ss.finish_date;

        ss.execution_date = parseTime(exd);
        ss.finish_date = parseTime(fid);
        ss.compositeType = "";
        ss.compositeType += ss.score_label === "NULL" ? "" : ss.score_label;
        ss.compositeType +=
            ss.score_subcategory === "NULL" ? "" : " | " + ss.score_subcategory;
        ss.score_subcategory =
            ss.score_subcategory === "NULL" ? "Simple" : ss.score_subcategory;
    }

    ///////////////////////////////////////////
    //Crossfilters Setup
    ///////////////////////////////////////////
    let students_teacher_cx = crossfilter(students_teacher);
    let students_assessments_cx = crossfilter(students_assessments);
    let students_scores_cx = crossfilter(students_scores);

    //First Data bridge (f)
    let f1dimsource = students_teacher_cx.dimension(d => fullname(d));
    let f1dimtarget = students_assessments_cx.dimension(d => fullname(d));
    let f2dimsource = students_teacher_cx.dimension(d => fullname(d));
    let f2dimtarget = students_assessments_cx.dimension(d => fullname(d));

    //Second Data bridge (S)
    let s1dimsource = students_assessments_cx.dimension(d => [d.name1,fullname(d)]);
    let s1dimtarget = students_scores_cx.dimension(d => [d.name1,fullname(d)]);
    let s2dimsource = students_assessments_cx.dimension(d => [d.name1,fullname(d)]);
    let s2dimtarget = students_scores_cx.dimension(d => [d.name1,fullname(d)]);
    ///////////////////////////////////////////
    //Render listeners
    ///////////////////////////////////////////
    let renderListener1 = function() {
        console.log("RL1")
        let records = f1dimsource.top(Infinity)
        let children = {};
        for (var i = 0; i < records.length; i++) {
            let name = fullname(records[i]);
            if (!children[name]) {
                children[name] = 1;
            }else{
                children[name] ++;
            }
        }
        //We want to re render all the second part of the dashboard with this children.
        let cok = Object.keys(children);

        //Remove all data from crossfilter and add it again
        f1dimtarget.filter(d=>true);
       students_assessments_cx.remove();
       f1dimtarget.filterAll();
       students_assessments_cx.add(students_assessments)
        //Filter the original data 
        f1dimtarget.filter(d => !cok.includes(d))
        students_assessments_cx.remove();
        f1dimtarget.filterAll();
        //Reset the height of the rowchart
        assessments_row_chart.height(assessments_dim.group().top(Infinity).length * 30 + 30);
        renderListener2();
    }

    let renderListener2 = function() {
        console.log("RL2")
        let records = s1dimsource.top(Infinity)
        let assessmnts = {};
        let children = {};
        for (var i = 0; i < records.length; i++) {
            let name = (records[i].name1);
            if (!assessmnts[name]) {
                assessmnts[name] = 1;
            }else{
                assessmnts[name] ++;
            }

            let cname = fullname(records[i]);
            if (!children[cname]) {
                children[cname] = 1;
            }else{
                children[cname] ++;
            }
        }
        //We want to re render all the second part of the dashboard with this children.
        let cok = Object.keys(assessmnts);
        let cok2 = Object.keys(children);
        //Remove all data from crossfilter and add it again
        s1dimtarget.filter(d=>true);
       students_scores_cx.remove();
       s1dimtarget.filterAll();
       students_scores_cx.add(students_scores)
        //Filter the original data 
        s1dimtarget.filter(d => {
            return !cok.includes(d[0]) || !cok2.includes(d[1]);
        })
        students_scores_cx.remove();
        s1dimtarget.filterAll();
        //Reset the height of the rowchart
        //assessments_row_chart.height(assessments_dim.group().top(Infinity).length * 30);
    rowtypes
        .height(rtypes_scores.group().top(Infinity).length * 30 + 30);

        piesection
        .height(section_scores_grouping.top(Infinity).length * 30 + 30)
    }
    ///////////////////////////////////////////
    //Screen Sizing
    ///////////////////////////////////////////
    let ww = window.innerWidth;
    let wh = window.innerHeight;
    let widescreen = ww > wh;

    ///////////////////////////////////////////
    //CHART 1
    ///////////////////////////////////////////
    let enrolled_students = students_teacher_cx.dimension(fullname);
    let enrolled_students_number = enrolled_students.group().top(Infinity)
        .length;
    d3.select("#enrolled_students").text(enrolled_students_number);

    ///////////////////////////////////////////
    //CHART 2
    ///////////////////////////////////////////
    let teacher_students = students_teacher_cx.dimension(d => [
        fullname(d),
        d.account
    ]);
    let assigned_students = teacher_students.group();

    let genFakeGroup = function() {
        let dimgen = function(orderType) {
            return function(N) {
                var dimtop = teacher_students[orderType](Infinity);
                var filtereddim = [];
                let teacher_object = {};
                for (var i = 0; i < dimtop.length; i++) {
                    let row = dimtop[i];
                    if (typeof teacher_object[row.account] == "undefined") {
                        teacher_object[row.account] = {};
                    }
                    let name = fullname(row);
                    if (
                        typeof teacher_object[row.account][name] == "undefined"
                    ) {
                        teacher_object[row.account][name] = 1;
                        if (filtereddim.length < N) {
                            filtereddim.push(row);
                        }
                    } else {
                        teacher_object[row.account][name] =
                            teacher_object[row.account][name] + 1;
                    }
                }
                let teachers = Object.keys(teacher_object);

                return filtereddim;
            };
        };
        let fakegroup_student_teacher = {
            top: dimgen("top"),
            bottom: dimgen("bottom")
        };

        return fakegroup_student_teacher;
    };

    let columnMeta = [
        {
            label: "Clients Assigned to Users",
            format: fullname
        }
    ];
    let assigned_students_table = dc.dataTable("#assigned_students");
    assigned_students_table
        .dimension(genFakeGroup())
        .section(d => d.account)
        .columns(columnMeta)
        .showSections(true)
        .order(d3.descending)
        .size(Infinity);
    ///////////////////////////////////////////
    //CHART 3
    ///////////////////////////////////////////
    let teachers_row_chart = dc.rowChart("#teacher_filter");
    let teachers_dim = students_teacher_cx.dimension(d => d.account);
    teachers_row_chart
        .dimension(teachers_dim)
        .group(teachers_dim.group())
        .on("filtered",function() {
            renderListener1();
        })

    ///////////////////////////////////////////
    //CHART 4
    ///////////////////////////////////////////
    let students_row_chart = dc.rowChart("#student_filter");
    let students_dim = students_teacher_cx.dimension(fullname);
    students_row_chart
        .dimension(students_dim)
        .group(students_dim.group())
.on("filtered",function() {
            renderListener1();
        })
    ///////////////////////////////////////////
    //CHART 5
    ///////////////////////////////////////////
    let assessments_scores = students_assessments_cx.dimension(d => [
        fullname(d),
        d.name1,
        d.status,
        d.execution_date,
        d.finish_date
    ]);
    let columnsAssessments = [
        {
            label: "Student",
            format: fullname
        },
        {
            label: "Assessment",
            format: d => d.name1
        },
        {
            label: "Status",
            format: d => d.status
        },
        {
            label: "Execution Date",
            format: d =>
                d.execution_date === null ? "" : formatTime(d.execution_date)
        },
        {
            label: "Finish Date",
            format: d =>
                d.finish_date === null ? "" : formatTime(d.finish_date)
        }
    ];
    let assessments_table = dc.dataTable("#assessment_table");
    assessments_table
        .dimension(assessments_scores)
        .section(d => d.name1)
        .columns(columnsAssessments)
        .showSections(false)
        .order(d3.descending)
        .size(Infinity);
    ///////////////////////////////////////////
    //CHART 6
    ///////////////////////////////////////////
    let assessments_status = students_assessments_cx.dimension(d =>
        fullname(d)
    );
    let assessments_status_grouping = assessments_status.group().reduce(
        function(p, v) {
            p[v.status]++;
            return p;
        },
        function(p, v) {
            p[v.status]--;
            return p;
        },
        function() {
            let sta = {};
            for (var i = 0; i < status_list.length; i++) {
                sta[status_list[i]] = 0;
            }
            return sta;
        }
    );
    var staxx = dc.barChart("#assessment_state");
    let children_ag = assessments_status_grouping.top(Infinity);
    let children = [];
    for (var i = 0; i < children_ag.length; i++) {
        children.push(children_ag[i].key);
    }
    let domain = d3
        .scaleBand()
        .domain(children)
        .range(children);
    staxx
        .dimension(assessments_status)
        .group(assessments_status_grouping)
        .barPadding(0.5)
        .elasticX(true)
        .xUnits(dc.units.ordinal)
        .x(domain)
        .yAxisLabel("Number of Assessments")
        .xAxisLabel("").renderVerticalGridLines(true)
        .renderHorizontalGridLines(true)
        .title(function(d) {
            let text = "";
            let act = d.value;
            let actk = Object.keys(act);
            for (var i = 0; i < actk.length; i++) {
                let k = actk[i];
                text += k + ":" + act[k];
                if (i < actk.length - 1) {
                    text += ", ";
                }
            }
            return d.key + " : (" + text + ")";
        })        .on("pretransition",function() {
            this.selectAll("svg").attr("height", "350px");
        })

    for (var i = 0; i < status_list.length; i++) {
        let staxFun = function(i) {
            return function(d) {
                return d.value[status_list[i]];
            };
        };
        staxx.stack(assessments_status_grouping, status_list, staxFun(i));
    }

    staxx.transitionDuration(0).on("renderlet", function() {
        this.selectAll("svg").attr("height", "350px");
        this.selectAll(".x.axis text")
            .style("text-anchor", "end")
            .style("transform", "rotate(-60deg) translate(-10px,-12px)");
          for (var i = 0; i < status_list.length; i++) {
          let myact = (status_list[i])
          let color = status_color_map[status_list[i]]
          let selector = this.selectAll(".stack._"+(i+1) + " .bar")
          selector.attr("fill",color);
      }
    });

    ///////////////////////////////////////////
    //CHART 7
    ///////////////////////////////////////////

    let pie = dc.pieChart("#assessment_status_pie");
    let assessments_status_p = students_assessments_cx.dimension(d => d.status);
    let assessments_status_pgrouping = assessments_status_p.group();
    pie.dimension(assessments_status_p)
        .group(assessments_status_pgrouping)
        .innerRadius(15)
        .externalLabels(30)
        .externalRadiusPadding(100)
        .legend(dc.legend())
        .drawPaths(true)
        .colorAccessor(function(d) {
            return status_color_map[d.key];
        })
        .minAngleForLabel(0);
    ///////////////////////////////////////////
    //CHART 8 & 9 Line chart
    ///////////////////////////////////////////
    let date_exec_chart = dc.barChart("#assessment_execution");
    let date_fini_chart = dc.barChart("#assessment_finish");
    let assessments_exec_date = students_assessments_cx.dimension(
        d => d.execution_date
    );
    let assessments_fini_date = students_assessments_cx.dimension(
        d => d.finish_date
    );
    let primaryDim = "execution_date";
    let secondaryDim = "finish_date";
    let aedbot = assessments_exec_date.bottom(Infinity);
    let aedtop = assessments_exec_date.top(Infinity);
    let afdbot = assessments_fini_date.bottom(Infinity);
    let afdtop = assessments_fini_date.top(Infinity);
    var mindom = assessments_exec_date.bottom(1)[0][primaryDim];
    var maxdom = assessments_exec_date.top(1)[0][primaryDim];
    if (mindom === null) {
        for (var i = 0; i < aedbot.length; i++) {
            if (aedbot[i][primaryDim] != null) {
                mindom = aedbot[i][primaryDim];
                break;
            }
        }
    }

    if (maxdom === null) {
        for (var i = 0; i < aedtop.length; i++) {
            if (aedtop[i][primaryDim] != null) {
                maxdom = aedtop[i][primaryDim];
                break;
            }
        }
    }

    var mindom2 = assessments_fini_date.bottom(1)[0][secondaryDim];
    var maxdom2 = assessments_fini_date.top(1)[0][secondaryDim];
    if (mindom2 === null) {
        for (var i = 0; i < afdbot.length; i++) {
            if (afdbot[i][secondaryDim] != null) {
                mindom2 = afdbot[i][secondaryDim];
                break;
            }
        }
    }

    if (maxdom2 === null) {
        for (var i = 0; i < afdtop.length; i++) {
            if (afdtop[i][secondaryDim] != null) {
                maxdom2 = afdtop[i][secondaryDim];
                break;
            }
        }
    }

    let dategrouping = "Week";
    if (!dategrouping) {
        dategrouping = "Month";
    }

    mindom = addTime(dategrouping, mindom, -1);
    maxdom = addTime(dategrouping, maxdom, 1);
    var timeDomain = d3.scaleTime().domain([mindom, maxdom]);
    mindom2 = addTime(dategrouping, mindom2, -1);
    maxdom2 = addTime(dategrouping, maxdom2, 1);
    var timeDomain2 = d3.scaleTime().domain([mindom2, maxdom2]);
    var timeDomain3 = d3.scaleTime().domain([mindom2, maxdom2]);

    var slices = {
        Day: d3.timeDay,
        Week: d3.timeWeek,
        Month: d3.timeMonth,
        Year: d3.timeYear
    };
    var sliceu = {
        Day: d3.timeDays,
        Week: d3.timeWeeks,
        Month: d3.timeMonths,
        Year: d3.timeYears
    };

    let assessments_exec_date_g = assessments_exec_date
        .group(slices[dategrouping])
        .reduceSum(d => (d[primaryDim] === null ? 0 : 1));

    let assessments_fini_date_g = assessments_fini_date
        .group(slices[dategrouping])
        .reduceSum(d => (d[secondaryDim] === null ? 0 : 1));

    date_exec_chart
        .xUnits(sliceu[dategrouping])
        .x(timeDomain)
        .clipPadding(10)
        .yAxisLabel("")
        .dimension(assessments_exec_date)
        .group(assessments_exec_date_g)
        .renderVerticalGridLines(true)
        .renderHorizontalGridLines(true)

    date_fini_chart
        .xUnits(sliceu[dategrouping])
        .x(timeDomain2)
        .clipPadding(10)
        .yAxisLabel("")
        .dimension(assessments_fini_date)
        .group(assessments_fini_date_g)
        .renderVerticalGridLines(true)
        .renderHorizontalGridLines(true)

    ///////////////////////////////////////////
    //CHART 10
    ///////////////////////////////////////////

    //
    let assessments_row_chart = dc.rowChart("#assessment_names");
    let assessments_dim = students_assessments_cx.dimension(d => d.name1);
    assessments_row_chart
        .dimension(assessments_dim)
        .group(assessments_dim.group())
        .on("filtered",function() {
            renderListener2();
        })

    ///////////////////////////////////////////
    //CHART 11
    ///////////////////////////////////////////
    let assessments_sscores = students_scores_cx.dimension(d => [fullname(d)]);
    let columnssAssessments = [
        {
            label: "Student",
            format: fullname
        },
        {
            label: "Assessment",
            format: d => d.name1
        },
        {
            label: "Score",
            format: d => d.score_value
        },
        {
            label: "Section",
            format: d => (d.title === "NULL" ? "" : d.title)
        },
        {
            label: "Score Type",
            format: d => d.compositeType
        }
    ];
    let assessments_stable = dc.dataTable("#assessment_scores");
    assessments_stable
        .dimension(assessments_sscores)
        .section(d => d.name1)

        .columns(columnssAssessments)
        .showSections(false)
        .order(d3.descending)
        .size(Infinity);
    ///////////////////////////////////////////
    //CHART 12
    ///////////////////////////////////////////

    let piesection = dc.rowChart("#section_scores");
    let section_scores = students_scores_cx.dimension(d => d.title);
    let section_scores_grouping = section_scores.group(d => d==="NULL"?"None":d);
    piesection
        .dimension(section_scores)
        .group(section_scores_grouping)
        .legend(dc.legend())
    ///////////////////////////////////////////
    //CHART 13
    ///////////////////////////////////////////

    let pietypes = dc.pieChart("#type_scores");
    let types_scores = students_scores_cx.dimension(d => d.score_subcategory);
    let types_scores_grouping = types_scores.group();
    pietypes
        .dimension(types_scores)
        .group(types_scores_grouping)
        .innerRadius(15)
        .externalLabels(30)
        .externalRadiusPadding(100)
        .legend(dc.legend())
        .drawPaths(true)
        .minAngleForLabel(0);
    ///////////////////////////////////////////
    //CHART 14
    ///////////////////////////////////////////

    let rowtypes = dc.rowChart("#cat_scores");
    let rtypes_scores = students_scores_cx.dimension(d => d.score_label);

    rowtypes
        .dimension(rtypes_scores)
        .group(rtypes_scores.group())
        
 ///////////////////////////////////////////
    //CHART 15 > box plot
    ///////////////////////////////////////////
    
    let bp_chart = dc.boxPlot("#bp1");
    let bp_dim = students_scores_cx.dimension(d => fullname(d));
    let bp_gp = bp_dim.group().reduce(function(p,v) {
        let dv = v.score_value;
            if (dv != Infinity && dv != null) p.splice(d3.bisectLeft(p, dv), 0, dv);
            return p;
    },function(p,v) {
        let dv = v.score_value;
            if (dv != Infinity && dv != null) p.splice(d3.bisectLeft(p, dv), 1);
            return p;
    },function() {return []});
    bp_chart
        
        .dimension(bp_dim)
        .group(bp_gp)
        .tickFormat(d3.format('.1f'))
        .yAxisLabel("Score")
        .xAxisLabel("", 0)
        .elasticY(true).renderVerticalGridLines(true)
        .renderHorizontalGridLines(true)
        .elasticX(true)
        .on("pretransition",function() {
            this.selectAll("svg").attr("height", "350px");
        })
        .on("renderlet",function() {
            
            this.selectAll(".x.axis text")
            .style("text-anchor", "end")
            .style("transform", "rotate(-60deg) translate(-10px,-12px)");
        })
    ///////////////////////////////////////////
    //CHART 16 > box plot
    ///////////////////////////////////////////
    
    let bp_chart2 = dc.boxPlot("#bp2");
    let bp_dim2 = students_scores_cx.dimension(d => (d.compositeType));
    let bp_gp2 = bp_dim2.group().reduce(function(p,v) {
        let dv = v.score_value;
            if (dv != Infinity && dv != null) p.splice(d3.bisectLeft(p, dv), 0, dv);
            return p;
    },function(p,v) {
        let dv = v.score_value;
            if (dv != Infinity && dv != null) p.splice(d3.bisectLeft(p, dv), 1);
            return p;
    },function() {return []});
    console.log(bp_chart2);
    bp_chart2
        .dimension(bp_dim2)
        .group(bp_gp2)
        .tickFormat(d3.format('.1f'))
        .yAxisLabel("Score")
        .xAxisLabel("", 0)
        .elasticY(true)
        .elasticX(true).renderVerticalGridLines(true)
        .renderHorizontalGridLines(true)
                .on("pretransition",function() {
            this.selectAll("svg").attr("height", "350px");
        })
        .on("renderlet",function() {
            this.selectAll("svg").attr("height", "350px");
            this.selectAll(".x.axis text")
            .style("text-anchor", "end")
            .style("transform", "rotate(-60deg) translate(-10px,-12px)");
        })

    ///////////////////////////////////////////
    //CHART 17 > box plot
    ///////////////////////////////////////////
    
    let bp_chart3 = dc.boxPlot("#bp3");
    let bp_dim3 = students_scores_cx.dimension(d => (d.title==="NULL"?"None":d.title));
    let bp_gp3 = bp_dim3.group().reduce(function(p,v) {
        let dv = v.score_value;
            if (dv != Infinity && dv != null) p.splice(d3.bisectLeft(p, dv), 0, dv);
            return p;
    },function(p,v) {
        let dv = v.score_value;
            if (dv != Infinity && dv != null) p.splice(d3.bisectLeft(p, dv), 1);
            return p;
    },function() {return []});
    bp_chart3
        .width(0.40 * window.innerWidth)
        .height(250)
        .dimension(bp_dim3)
        .group(bp_gp3)
        .tickFormat(d3.format('.1f'))
        .yAxisLabel("Score")
        .xAxisLabel("", 0)
        .elasticY(true)
        .elasticX(true).renderVerticalGridLines(true)
        .renderHorizontalGridLines(true)
                .on("pretransition",function() {
            this.selectAll("svg").attr("height", "350px");
        })
        .on("renderlet",function() {
            this.selectAll("svg").attr("height", "350px");
            this.selectAll(".x.axis text")
            .style("text-anchor", "end")
            .style("transform", "rotate(-60deg) translate(-10px,-12px)");
        })

        
    ///////////////////////////////////////////
    //CHART 18 > Date scores
    ///////////////////////////////////////////
    let date_scores = dc.scatterPlot("#date_scores");

    let scores_date_dim = students_scores_cx.dimension(
        d => [d.finish_date,d.score_value,d.name]
    );

    var symbolScale = d3.scaleOrdinal().range(d3.symbols);

    date_scores
        .xUnits(sliceu[dategrouping])
        .x(timeDomain3)
        .clipPadding(10)
        .yAxisLabel("Score")
        .dimension(scores_date_dim)
        .group(scores_date_dim.group())
        .renderVerticalGridLines(true)
        .renderHorizontalGridLines(true)
        .elasticY(true)
        .keyAccessor(function (d) { return d.key[0]; })
        .valueAccessor(function (d) { return d.key[1]; })
        .colorAccessor(function (d) { return d.key[2]; })
    ///////////////////////////////////////////
    //Render
    ///////////////////////////////////////////

    resize();
    window.onresize = resize;
    dc.renderAll();
};

d3.queue()
    .defer(d3.csv, "datasets/assessments/assessments_1.csv")
    .defer(d3.csv, "datasets/assessments/assessments_2.csv")
    .defer(d3.csv, "datasets/assessments/assessments_3.csv")
    .awaitAll(function(err, d) {
        console.log(err);
        renderDashboard(d);
    });
