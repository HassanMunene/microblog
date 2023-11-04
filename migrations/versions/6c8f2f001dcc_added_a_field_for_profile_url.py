"""added a field for profile url

Revision ID: 6c8f2f001dcc
Revises: 2ac84992e8d9
Create Date: 2023-11-04 10:23:55.176876

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6c8f2f001dcc'
down_revision = '2ac84992e8d9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_picture_url', sa.String(length=500), nullable=True))
        batch_op.alter_column('email',
               existing_type=mysql.VARCHAR(length=64),
               nullable=False)
        batch_op.create_index(batch_op.f('ix_users_profile_picture_url'), ['profile_picture_url'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_users_profile_picture_url'))
        batch_op.alter_column('email',
               existing_type=mysql.VARCHAR(length=64),
               nullable=True)
        batch_op.drop_column('profile_picture_url')

    # ### end Alembic commands ###
