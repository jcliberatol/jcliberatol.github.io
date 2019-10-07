/*
*Four tables are handled, 
* 1) Therapist and Children
* 2) Children's Assigned Assessments
* 3) Children's Assessment Executions
* 4) Children's Assessment Scores
*/

/*
=====================================
=============TABLE=1=================
=====================================
*/
Select
    account_child_relation.account,
    child.last_name,
    child.middle_name,
    child.name
From
    account_child_relation Inner Join
    child On account_child_relation.id_child = child.id_child 
/*
=====================================
=============TABLE=2=================
=====================================
*/

Select
    child.last_name,
    child.middle_name,
    child.name,
    assessment.name As name1,
    assessment.description,
    assessment_execution.execution_date,
    assessment_execution.finish_date,
    assessment_execution.status
From
    child Inner Join
    assessment_child_relation On assessment_child_relation.id_child = child.id_child Inner Join
    assessment On assessment_child_relation.id_assessment = assessment.id_assessment Left Join
    assessment_execution On assessment_execution.id_relation = assessment_child_relation.id_relation
/*
=====================================
=============TABLE=3=================
=====================================
*/

Select
    child.last_name,
    child.middle_name,
    child.name,
    assessment.name As name1,
    assessment.description,
    assessment_execution.execution_date,
    assessment_execution.finish_date,
    assessment_execution.status,
    assessment_execution.id_assessment_execution,
    assessment_exec_score.score_label,
    assessment_exec_score.score_subcategory,
    assessment_exec_score.score_value,
    assessment_exec_score.id_section,
    assessment_section.title
From
    child Inner Join
    assessment_child_relation On assessment_child_relation.id_child = child.id_child Inner Join
    assessment On assessment_child_relation.id_assessment = assessment.id_assessment Inner Join
    assessment_execution On assessment_execution.id_relation = assessment_child_relation.id_relation Inner Join
    assessment_exec_score On assessment_exec_score.id_assessment_execution =
            assessment_execution.id_assessment_execution Left Join
            assessment_section On assessment_section.id_section = assessment_exec_score.id_section