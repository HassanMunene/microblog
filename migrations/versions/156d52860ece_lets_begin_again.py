"""lets begin again

Revision ID: 156d52860ece
Revises: 
Create Date: 2023-11-18 23:17:35.487921

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '156d52860ece'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(length=256), nullable=True))
        batch_op.add_column(sa.Column('topic', sa.String(length=128), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_column('topic')
        batch_op.drop_column('title')

    # ### end Alembic commands ###
