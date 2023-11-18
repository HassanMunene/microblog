from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    body = TextAreaField("Tell your story", validators=[DataRequired()])
    submit = SubmitField('Submit')
